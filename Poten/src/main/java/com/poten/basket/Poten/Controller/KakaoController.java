package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.Service.JwtService;
import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;

    private final JwtService jwtService;


    @GetMapping("/callback")
    public ResponseEntity<Object> callback(HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(request.getParameter("code"));
        System.out.println(kakaoInfo);
        String email = kakaoInfo.getEmail();

        if (kakaoService.countEmail(email) == 0){
            return ResponseEntity.ok("email = " + email);
        }

        String jwtAccessToken = jwtService.createAccessToken(email);
        String jwtRefreshToken = jwtService.createRefreshToken();
        response.setHeader("nickname", kakaoService.getNickname(email));
        jwtService.sendAccessAndRefreshToken(response, jwtAccessToken, jwtRefreshToken);
        jwtService.updateRefreshToken(email, jwtRefreshToken);

        response.sendRedirect("https://modubasketball.com/#/map");
        return ResponseEntity.ok(
                "로그인에 성공하였습니다. email = " + email +
                "\naccessToken = " + jwtAccessToken +
                "\nrefreshToken = " + jwtRefreshToken);
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect(kakaoService.getKakaoLogin());
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
