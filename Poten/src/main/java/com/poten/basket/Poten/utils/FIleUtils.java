package com.poten.basket.Poten.utils;

import com.poten.basket.Poten.DAO.ImageDAO;
import com.poten.basket.Poten.VO.Photo;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FIleUtils {

  @Autowired
  ImageDAO imageDAO;

  // 서버 업로드 경로
  String applicationDirectory = System.getProperty("user.dir");

  @Value("${file.upload.directory}")
  String uploadPath;

  //   public List<Photo> uploadFiles(
  //     final List<MultipartFile> multipartFiles,
  //     String nickname
  //   ) {
  //     List<Photo> files = new ArrayList<>();
  //     for (MultipartFile multipartFile : multipartFiles) {
  //       if (multipartFile.isEmpty()) {
  //         continue;
  //       }
  //       files.add(uploadFile(multipartFile, nickname));
  //     }
  //     return files;
  //   }

  /**
   * 단일 파일 업로드
   *
   * @param multipartFile - 파일 객체
   * @return DB에 저장할 파일 정보
   */
  public void uploadFile(MultipartFile file, String saveName, String ext) {
    Path path = Paths.get(uploadPath + saveName + "." + ext);

    try {
      file.transferTo(path);
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  /**
   * 업로드할 파일이랑 기존파일이랑 비교해서 삭제
   * @param newFiles - 새 업로드할 파일
   * */
  public void deleteFiles(List<Photo> newFiles) {
    for (int i = 0; i < newFiles.size(); i++) {
      List<Photo> files = imageDAO.mapPhoto(newFiles.get(i).getId());
      Photo file = files.get(i); // 기존 파일
      if (file.getOriginalName().equals(newFiles.get(i).getOriginalName())) {
        String uploadPath = file.getUploadPath();
        File deleteFile = new File(uploadPath);
        deleteFile.delete();
        imageDAO.delPhoto(file);
      }
    }
  }

  public String getExtension(MultipartFile file) {
    String fileName = file.getName();
    String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    System.out.println("fimeName = " + fileName);
    System.out.println("extension = " + extension);
    return extension;
  }

  /**
   * 저장 파일명 생성
   * @return 디스크에 저장할 파일명
   */
  public String generateSaveFilename() {
    return UUID.randomUUID().toString();
  }

  private String makeDirectory(String path) {
    File dir = new File(uploadPath + File.separator + path);

    if (dir.exists() == false) {
      dir.mkdirs();
    }
    return dir.getPath();
  }
}
