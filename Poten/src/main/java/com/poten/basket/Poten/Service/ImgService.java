package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.ImageDAO;
import com.poten.basket.Poten.VO.Image;
import com.poten.basket.Poten.VO.Photo;
import com.poten.basket.Poten.utils.FIleUtils;
import java.io.File;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImgService {

  private final ImageDAO imageDAO;
  private final FIleUtils fileUtils;

  @Value("${file.upload.directory}")
  String uploadPath;

  public File getImage(String name) {
    Image image = imageDAO.getImg(name);
    return new File(uploadPath + image.getName() + "." + image.getExt());
  }

  @Transactional
  public void deleteFile(String name) {
    Image image = imageDAO.getImg(name);

    imageDAO.deleteImageRelation(name);
    imageDAO.deleteImage(name);

    File file = new File(uploadPath + image.getName() + "." + image.getExt());
    if (file.exists()) file.delete();
  }

  @Transactional
  public void updateImage(int id, List<MultipartFile> files)
    throws IOException {
    files.forEach(file -> {
      String name = fileUtils.generateSaveFilename();
      String ext = FilenameUtils.getExtension(file.getOriginalFilename());

      imageDAO.insertImage(
        Image
          .builder()
          .name(name)
          .originalName(file.getOriginalFilename())
          .ext(ext)
          .size(file.getSize())
          .build()
      );

      imageDAO.insertImageRelation(id, name);

      fileUtils.uploadFile(file, name, ext);
    });
  }

  public void mapPhotoUpload(List<Photo> files) {
    imageDAO.mapPhotoUpload(files);
  }
}
