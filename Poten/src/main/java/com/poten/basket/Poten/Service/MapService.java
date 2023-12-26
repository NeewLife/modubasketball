package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapService {

  @Autowired
  MapDAO mapDAO;

  public List<MapResponse> mapList() throws IOException {
    List<MapResponse> mapResponseList = mapDAO.mapList();
    for (int i = 0; i < mapResponseList.size(); i++) {
      int id = mapResponseList.get(i).getId();
      List<Photo> photo = mapDAO.mapPhoto(id);
      System.out.println("photo = " + photo);

      if (!photo.isEmpty()) {
        for (int j = 0; j < photo.size(); j++) {
          System.out.println(photo.get(j).getUploadPath());
          String filePath = photo.get(j).getUploadPath().trim();
          try (InputStream in = new FileInputStream(filePath)) {
            byte[] image = IOUtils.toByteArray(in);
            System.out.println("image = " + image);
            photo.get(j).setPhotoByteData(image);
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
      }
    }
    return mapResponseList;
  }

  public MapResponse getOne(int id) {
    return mapDAO.getOne(id);
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
