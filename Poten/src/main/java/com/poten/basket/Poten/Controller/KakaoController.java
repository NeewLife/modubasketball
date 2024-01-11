package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.KakaoService;
import com.poten.basket.Poten.VO.User;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
