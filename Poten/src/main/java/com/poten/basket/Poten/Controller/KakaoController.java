package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.DTO.KakaoDTO;
import com.poten.basket.Poten.DTO.TokenDTO;
import com.poten.basket.Poten.Service.JwtService;
import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.User;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {

  private final KakaoService kakaoService;

  @GetMapping("/callback/{code}")
  public ResponseEntity<Object> callback(
    @PathVariable(value = "code", required = true) String code
  ) throws ParseException, Exception {
    return ResponseEntity.ok(kakaoService.loginHandler(code));
  }

  @GetMapping("/login")
  public void login(HttpServletResponse response) throws IOException {
    response.sendRedirect(kakaoService.getKakaoLogin());
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody User user) {
    if (kakaoService.nickDupCheck(user.getEmail()) != 0) {
      return ResponseEntity.ok("이미 존재하는 닉네임 입니다.");
    }

    kakaoService.register(user);
    return ResponseEntity.ok("회원가입 완료");
  }
}
