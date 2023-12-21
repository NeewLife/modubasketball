package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapService {

  @Autowired
  MapDAO mapDAO;

  public List<MapResponse> mapList() {
    List<MapResponse> mapResponseList = mapDAO.mapList();
    for (int i = 0; i < mapResponseList.size(); i++) {
      int id = mapResponseList.get(i).getId();
      mapResponseList.get(i).setPhotoList(mapDAO.mapPhotoList(id));
    }
    return mapResponseList;
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

  public void mapPhotoUpload(List<Photo> files) {
    mapDAO.mapPhotoUpload(files);
  }

  public void feedback(HashMap<String, Object> params) {
    mapDAO.feedback(params);
  }

  public List<Feedbacks> getFeedbacks() {
    return mapDAO.getFeedbacks();
  }

  public void delPhoto(Integer id) {
    mapDAO.delPhoto(id);
  }
}
