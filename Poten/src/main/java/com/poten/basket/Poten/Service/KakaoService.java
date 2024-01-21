package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.KakaoDAO;
import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.DTO.TokenDTO;
import com.poten.basket.Poten.VO.User;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.http.parser.Authorization;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Log4j2
@RequiredArgsConstructor
public class KakaoService {

  private final KakaoDAO kakaoDAO;

  @Value("${kakao.client.id}")
  private String KAKAO_CLIENT_ID;

  @Value("${kakao.client.secret}")
  private String KAKAO_CLIENT_SECRET;

  @Value("${kakao.redirect.url}")
  private String KAKAO_REDIRECT_URL;

  private static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
  private static final String KAKAO_API_URI = "https://kapi.kakao.com";

  /**
   * code -> accessToken, refreshToken
   * @param code 카카오 로그인 성공 code
   * @return
   */
  private ResponseEntity<String> makeTokenEntity(String code) {
    HttpHeaders headers = new HttpHeaders();
    headers.add(
      "Content-type",
      "application/x-www-form-urlencoded;charset=utf-8"
    );

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", KAKAO_CLIENT_ID);
    params.add("client_secret", KAKAO_CLIENT_SECRET);
    params.add("code", code);
    params.add("redirect_uri", KAKAO_REDIRECT_URL);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(
      params,
      headers
    );

    return restTemplate.exchange(
      KAKAO_AUTH_URI + "/oauth/token",
      HttpMethod.POST,
      httpEntity,
      String.class
    );
  }

  /**
   * email -> db refreshToken -> accessToken 재발급
   * @param email
   * @return
   */
  private ResponseEntity<String> makeRefreshTokenEntity(String email) {
    HttpHeaders headers = new HttpHeaders();
    headers.add(
      "Content-type",
      "application/x-www-form-urlencoded;charset=utf-8"
    );

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "refresh_token");
    params.add("client_id", KAKAO_CLIENT_ID);
    params.add("refresh_token", kakaoDAO.getUserByRefreshToken(email));

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(
      params,
      headers
    );

    return restTemplate.exchange(
      KAKAO_AUTH_URI + "/oauth/token",
      HttpMethod.POST,
      httpEntity,
      String.class
    );
  }

  /**
   * accessToken -> user info (nickname ...)
   * @param accessToken
   * @return
   */
  private ResponseEntity<String> makeInfoEntity(String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + accessToken);
    headers.add(
      "Content-type",
      "application/x-www-form-urlencoded;charset=utf-8"
    );

    RestTemplate rt = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(
      headers
    );

    return rt.exchange(
      KAKAO_API_URI + "/v2/user/me",
      HttpMethod.POST,
      httpEntity,
      String.class
    );
  }

  private TokenDTO getToken(String code) throws ParseException, Exception {
    TokenDTO tokenDTO = new TokenDTO();

    try {
      ResponseEntity<String> response = makeTokenEntity(code);

      JSONParser jsonParser = new JSONParser();
      JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());

      tokenDTO.setAccessToken((String) jsonObj.get("access_token"));
      tokenDTO.setRefreshToken((String) jsonObj.get("refresh_token"));
    } catch (ParseException e) {
      e.printStackTrace();
      log.debug("token json parser error");
    } catch (Exception e) {
      e.printStackTrace();
      log.debug("token http error");
    }

    return tokenDTO;
  }

  private KakaoDTO getInfo(String accessToken)
    throws ParseException, Exception {
    KakaoDTO kakaoDTO = new KakaoDTO();

    try {
      ResponseEntity<String> response = makeInfoEntity(accessToken);

      JSONParser jsonParser = new JSONParser();
      JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
      JSONObject account = (JSONObject) jsonObj.get("kakao_account");
      JSONObject profile = (JSONObject) account.get("profile");

      kakaoDTO.setEmail(String.valueOf(account.get("email")));
      kakaoDTO.setNickname(String.valueOf(profile.get("nickname")));
    } catch (ParseException e) {
      e.printStackTrace();
      log.debug("token json parser error");
    } catch (Exception e) {
      e.printStackTrace();
      log.debug("token http error");
    }

    return kakaoDTO;
  }

  public Map<String, String> loginHandler(HttpServletResponse response, String code)
    throws ParseException, Exception {
    Map<String, String> answer = new HashMap<>();

    TokenDTO token = getToken(code);
    KakaoDTO info = getInfo(token.getAccessToken());

    setAccessTokenHeader(response, token.getAccessToken());

    answer.put("accessToken", token.getAccessToken());
    answer.put("email", info.getEmail());
    answer.put("nickname", kakaoDAO.getUserByNickname(info.getEmail()));

    return answer;
  }

  public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
    response.setHeader("Authorization", accessToken);
  }

  public boolean isAccessTokenVaild(HttpServletRequest request, String nickname) throws Exception {
    String accessToken = String.valueOf(extractAccessToken(request));
    KakaoDTO info = getInfo(accessToken);
    String dbNickname = kakaoDAO.getUserByNickname(info.getEmail());
    boolean result = isUserVaild(nickname, dbNickname);

    return result;
  }

  public boolean isUserVaild(String nickname, String dbNickname){
    return dbNickname.equals(nickname);
  }

  private Optional<String> extractAccessToken(HttpServletRequest request) {
    return Optional.ofNullable(request.getHeader("Authorization"))
            .filter(accessToken -> accessToken.startsWith("Bearer "))
            .map(accessToken -> accessToken.replace("Bearer ", ""));
  }

  public boolean nickDupCheck(String nickname) {
    if (kakaoDAO.nickDupCheck(nickname) == 0) return true;

    return false;
  }

  @Transactional
  public void register(User user) {
    kakaoDAO.register(user);
  }

}
