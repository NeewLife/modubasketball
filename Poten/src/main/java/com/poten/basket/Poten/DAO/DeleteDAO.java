package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.MapResponse;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DeleteDAO {
  List<MapResponse> getBasketSpotByState(int state);
  int getBasketSpotCount(int id);

  void modifyBasketSpotDelete(int id);
  void addBasketSpotDelete(int id);

  void modifyBasketSpotDeleteByState(int state, int id);
}
