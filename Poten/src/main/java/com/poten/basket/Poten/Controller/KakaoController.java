package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

  private final KakaoService kakaoService;

  @GetMapping("/callback/{code}")
  public ResponseEntity<Object> callback(
    HttpServletResponse response,
    @PathVariable(value = "code", required = true) String code
  ) throws ParseException, Exception {
    Map<String, String> result = kakaoService.loginHandler(response,code);
    kakaoService.setAccessTokenHeader(response, result.get("accessToken"));
    return ResponseEntity.ok(result);
  }

  @GetMapping("/register/{nickname}")
  public ResponseEntity<?> register(
    @PathVariable(value = "nickname", required = true) String nickname
  ) {
    return ResponseEntity.ok(kakaoService.nickDupCheck(nickname));
  }

  @PostMapping("/register")
  public ResponseEntity<?> postMethodName(@RequestBody User user) {
    kakaoService.register(user);

    return ResponseEntity.ok(true);
  }
}
