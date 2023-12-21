package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MapDAO {

    List<MapResponse> mapList();

    List<Photo> mapPhotoList(int id);

    List<MapResponse> mapReqList();

    List<MapResponse> mapDelList();

    List<MapResponse> mapRejList();

    // 방문자수 호출
    int visitCount();

    List<Feedbacks> getFeedbacks();

    void feedback(HashMap<String, Object> params);

    void mapCre(MapRequest params);

    void mapPhotoUpload(List<Photo> params);

    int getLastID();

    // 방문자수 + 1
    void visitCounting();

    void mapUpt(MapRequest params);

    void mapDelRequest(int params);

    void mapDel(int params);

    void mapDelReject(int params);

    void delPhoto(Integer id);
}
