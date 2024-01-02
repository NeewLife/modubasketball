package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface KakaoDAO {

    int countEmail(String email);

    int nickDupCheck(String nickname);

    String getNickname(String email);

    void register(User params);
}
