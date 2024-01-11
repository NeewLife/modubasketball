package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface KakaoDAO {
  int nickDupCheck(String nickname);

  String getNickname(String email);

  void register(User params);

  String getUserByRefreshToken(String email);
  String getUserByNickname(String email);
}
