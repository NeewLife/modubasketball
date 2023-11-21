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

    int visitCount();

    void mapCre(MapRequest params);

    void mapUpt(MapRequest params);

    void mapDelReq(int params);

    void mapDel(int params);

    void feedback(HashMap<String, Object> params);

    void visitCounting();

    List<Feedbacks> getFeedbacks();
}
