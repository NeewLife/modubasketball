package com.poten.basket.Poten.VO;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class User {

  private String nickname;
  private String email;
  private String createDate;
  private String modifyDate;

  public void updateRefreshToken(String refreshToken) {}
}
