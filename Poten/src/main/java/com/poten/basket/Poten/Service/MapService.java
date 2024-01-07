package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.ImageDAO;
import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapService {

  private final MapDAO mapDAO;
  private final ImageDAO imageDAO;

  public List<MapResponse> mapList() {
    return mapDAO.mapList();
  }

  public MapResponse getOne(int id) {
    MapResponse response = mapDAO.getOne(id);
    response.setImageList(imageDAO.getImgGroup(id));

    return response;
  }

  public void visitCounting() {
    mapDAO.visitCounting();
  }

  public int visitCount() {
    return mapDAO.visitCount();
  }

  public void mapCre(MapRequest params) {
    mapDAO.mapCre(params);
  }

  public int getLastID() {
    return mapDAO.getLastID();
  }

  public void mapUpt(MapRequest params) {
    mapDAO.mapUpt(params);
  }



  public void feedback(HashMap<String, Object> params) {
    mapDAO.feedback(params);
  }

  public List<Feedbacks> getFeedbacks() {
    return mapDAO.getFeedbacks();
  }


}
