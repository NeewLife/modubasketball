package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDAO {

    User findByRefreshToken(String refreshToken);

    User findByEmail(String email);

    void updateRefreshToken(String refreshToken, String email);


}
