package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface KakaoDAO {

    int getUser(String email);

    void register(Map<String, Object> params);
}
