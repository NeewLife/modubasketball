package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.Service.KakaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;

    @GetMapping("/callback")
    public ResponseEntity<Object> callback(HttpServletRequest request) throws Exception {
        KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(request.getParameter("code"));
        System.out.println("callback 함수 실행");
        System.out.println(kakaoInfo);
        return ResponseEntity.ok()
                .body(kakaoInfo);
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws Exception {
        response.sendRedirect(kakaoService.getKakaoLogin());
    }
}
