package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MapDAO {

    List<MapResponse> mapList();

    // 방문자수 + 1
    void visitCounting();

    // 방문자수 호출
    int visitCount();

    void mapCre(MapRequest params);

    void mapUpt(MapRequest params);

    void mapDelReq(int params);

    void mapDel(int params);

    void feedback(HashMap<String, Object> params);



    List<Feedbacks> getFeedbacks();
}
