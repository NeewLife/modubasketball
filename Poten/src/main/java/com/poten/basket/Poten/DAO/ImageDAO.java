package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Image;
import com.poten.basket.Poten.VO.Photo;

import java.util.List;

public interface ImageDAO {
  Image getImg(String name);
  List<Image> getImgGroup(int id);

  void delPhoto(Photo param);

  List<Photo> mapPhoto(int id);

  void mapPhotoUpload(List<Photo> params);
}
