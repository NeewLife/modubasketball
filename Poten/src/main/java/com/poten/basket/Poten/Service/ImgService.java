package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.ImageDAO;
import com.poten.basket.Poten.VO.Image;
import java.io.File;
import java.util.List;

import com.poten.basket.Poten.VO.Photo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImgService {

  private final ImageDAO imageDAO;

  @Value("${file.upload.directory}")
  String uploadPath;

  public File getImage(String name) {
    Image image = imageDAO.getImg(name);
    return new File(uploadPath + image.getName() + "." + image.getExt());
  }

  public void mapPhotoUpload(List<Photo> files) {
    imageDAO.mapPhotoUpload(files);
  }

}
