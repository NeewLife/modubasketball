package com.poten.basket.Poten.Controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController implements ErrorController{
    @GetMapping({ "/", "/error"})
    public String index() {
        return "index.html";
    }

//    @RequestMapping("/")
//    public String mainPage(){
//        return "index.html";
//    }
}