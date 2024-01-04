package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Image;
import java.util.List;

public interface ImageDAO {
  Image getImg(String name);
  List<Image> getImgGroup(int id);
}
