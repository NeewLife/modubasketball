package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;


    // 프론트에서 인가 코드 넘겨주면 실행됨
    @GetMapping("/login")
    public ResponseEntity<Object> callback(@RequestParam String code) throws Exception {
        KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(code);
        System.out.println(kakaoInfo);
        String email = kakaoInfo.getEmail();
        if (kakaoService.countEmail(email) == 0){
            return ResponseEntity.ok(email);
        }
        return ResponseEntity.ok()
                .body("nickname = " + kakaoService.getNickname(email));
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String email
                                         , @RequestParam String userNickname){
        if (kakaoService.nickDupCheck(email) != 0){
            return ResponseEntity.ok("이미 존재하는 닉네임 입니다.");
        }
        HashMap<String, Object> params = new HashMap<>();
        params.put("email", email);
        params.put("userNickname", userNickname);

        kakaoService.register(params);
        return ResponseEntity.ok("회원가입 완료");
    }
}
