package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.Service.JwtService;
import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.HashMap;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;

    private final JwtService jwtService;


    // 프론트에서 인가 코드 넘겨주면 실행됨
    @PostMapping("/callback")
    public ResponseEntity<Object> callback(HttpServletResponse response,
                                           @RequestParam String code) throws Exception {
        KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(code);
        System.out.println(kakaoInfo);
        String email = kakaoInfo.getEmail();

        // 회원가입이 안된상태
        // 뭘 보내야 할까? 백에서 자체적으로 리다이렉트를 할까?
        // null 을 보내야 하나?
        if (kakaoService.countEmail(email) == 0){
            return ResponseEntity.ok("email = " + email);
        }

        String jwtAccessToken = jwtService.createAccessToken(email);
        String jwtRefreshToken = jwtService.createRefreshToken();
        response.setHeader("nickname", kakaoService.getNickname(email));
        jwtService.sendAccessAndRefreshToken(response, jwtAccessToken, jwtRefreshToken);
        jwtService.updateRefreshToken(email, jwtRefreshToken);

        return ResponseEntity.ok(
                "로그인에 성공하였습니다. email = " + email +
                "\naccessToken = " + jwtAccessToken +
                "\nrefreshToken = " + jwtRefreshToken);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok(kakaoService.getKakaoLogin());
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        if (kakaoService.nickDupCheck(user.getEmail()) != 0){
            return ResponseEntity.ok("이미 존재하는 닉네임 입니다.");
        }

        kakaoService.register(user);
        return ResponseEntity.ok("회원가입 완료");
    }
}
