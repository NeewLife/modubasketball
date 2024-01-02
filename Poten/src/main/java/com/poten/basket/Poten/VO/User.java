package com.poten.basket.Poten.VO;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class User {
    private int id;
    private String email;
    private String userNickname;
    private String refreshToken;

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
