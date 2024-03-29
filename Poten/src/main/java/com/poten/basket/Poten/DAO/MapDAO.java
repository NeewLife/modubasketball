package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MapDAO {
  List<MapResponse> mapList();
  MapResponse getOne(int id);

  // 방문자수 호출
  int visitCount();

  List<Feedbacks> getFeedbacks();

  void feedback(HashMap<String, Object> params);

  void mapCre(MapRequest params);

  int getLastID();

  // 방문자수 + 1
  void visitCounting();

  void mapUpt(MapRequest params);
}
