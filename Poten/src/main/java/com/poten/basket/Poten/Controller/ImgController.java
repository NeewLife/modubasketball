package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.ImgService;
import com.poten.basket.Poten.VO.Photo;
import com.poten.basket.Poten.utils.FIleUtils;
import com.poten.basket.Poten.utils.JwtTokenUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/img")
@RequiredArgsConstructor
public class ImgController {

  @Autowired
  FIleUtils fIleUtils;

  @Autowired
  JwtTokenUtil jwtTokenUtil;

  private final ImgService imgService;

  private final String[] fileType = {
          "png",
          "PNG",
          "jpg",
          "JPG",
          "jpeg",
          "JPEG",
  };

  // 사진 데이터 가져오는 API
  @GetMapping(value = "/{name}", produces = MediaType.IMAGE_PNG_VALUE)
  public @ResponseBody void getImageWithMediaType(
    HttpServletResponse response,
    @PathVariable(value = "name", required = true) String name
  ) throws IOException {
    File file = imgService.getImage(name);

    FileInputStream inputStream = new FileInputStream(file);
    ServletOutputStream outputStream = response.getOutputStream();

    outputStream.write(IOUtils.toByteArray(inputStream));
  }

  /*
  * 사진 업로드 하는 RestAPI Servlet 방식
  * @param - 파일 이름
  * @return - 결과 메세지
  * */
  @PostMapping(value = "/upload")
  public String uploadImage(
          HttpServletResponse response,
          HttpServletRequest request,
          List<MultipartFile> files
  ) throws ServletException, IOException {
    // jwt 토큰이 유효할 때만 사진 수정
    if(!jwtTokenUtil.validateJwtToken(request, response)) {
      return "유효하지 않은 토큰입니다.";
    }

    for(int i = 0; i < files.size(); i++) {

    }
    if (file.length() > 20971520) {
      return ResponseEntity.ok("사진 크기가 너무 큽니다. (20mb 제한)");
    }
    String fileExt = fIleUtils.getExtension(file);
    if (!Arrays.asList(fileType).contains(fileExt)) {
      return ResponseEntity.ok("잘못된 확장자 입니다.");
    }


    List<Photo> photoList = fIleUtils.uploadFiles(file, request.getHeader("nickname"));

    Integer id = params.getId();
    fIleUtils.deleteFiles(id);
    mapService.delPhoto(id);
    for (int i = 0; i < photoList.size(); i++) {
      photoList.get(i).setSeq(i + 1);
      photoList.get(i).setId(id);
    }
    mapService.mapPhotoUpload(photoList);

    return ResponseEntity.ok("사진 업로드 완료");
    }
  }
}
