package com.poten.basket.Poten.Controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class MainController {

    @RequestMapping("/")
    public String mainPage(){
        return "index.html";
    }

    @GetMapping("/login")
    @ResponseBody
    public void kakaoLogin(HttpServletResponse response,
                             @RequestParam String code) throws IOException {
        System.out.println("code : " + code);
        String redirect_uri = "https://modubasketball.com/kakao/callback/";
        response.sendRedirect(redirect_uri + code);
    }
}
