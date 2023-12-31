package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDAO {

    String findByRefreshToken(String refreshToken);

    String findByEmail(String email);

    String updateRefreshToken(User user);


}
