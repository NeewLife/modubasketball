package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.MapService;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import com.poten.basket.Poten.utils.FIleUtils;
import java.io.IOException;
import java.util.*;

import com.poten.basket.Poten.utils.JwtTokenUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class APIController {

  @Autowired
  MapService mapService;

  @Autowired
  FIleUtils fIleUtils;

  @Autowired
  JwtTokenUtil jwtTokenUtil;

  private final String[] fileType = {
    "png",
    "PNG",
    "jpg",
    "JPG",
    "jpeg",
    "JPEG",
  };

  /*
   * 지도 리스트 조회
   * return값 - mapList(List 형태의 전체 지도 데이터)
   * return 지도 데이터 형식 - com.poten.basket.Poten.VO.MapResponse
   * */
  @GetMapping("/")
  public ResponseEntity<List<MapResponse>> openMap() throws IOException {
    HttpHeaders headers = new HttpHeaders();
    headers.setCacheControl(CacheControl.noCache().mustRevalidate());
    List<MapResponse> mapList = mapService.mapList();
    return ResponseEntity.ok(mapList);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOne(
    @PathVariable(value = "id", required = true) int id
  ) {
    return ResponseEntity.ok(mapService.getOne(id));
  }

  /*
   * 방문자수 + 1
   * */
  @PutMapping("/counting")
  public ResponseEntity<String> visitCounting() {
    mapService.visitCounting();
    return ResponseEntity.ok("count + 1 완료");
  }

  /*
   * 방문자수 조회
   * return 방문자수
   * */
  @GetMapping("/count")
  public ResponseEntity visitCount() {
    int visitCount = mapService.visitCount();
    return ResponseEntity.ok(visitCount);
  }

  /*
   * 지도 데이터 추가
   * param - com.poten.basket.Poten.VO.MapRequest
   * */
  @PostMapping("/spot/create")
  public ResponseEntity saveSpot(
    HttpServletRequest request,
    HttpServletResponse response,
    @RequestPart MapRequest params,
    @RequestPart(required = false) List<MultipartFile> files
  ) throws Exception {
    System.out.println("====================create====================");
    Integer id = mapService.getLastID();
    params.setId(id);
    System.out.println("params = " + params);
    System.out.println("files = " + files);

    // 사진이 존재하면 jwt 토큰인증
    if (files != null) {

      // jwt 토큰이 유효할 때만 사진 업로드
      if(jwtTokenUtil.validateJwtToken(request, response)){
        for (MultipartFile photo : files) {
          if (photo.getSize() > 20971520) {
            return ResponseEntity.ok("사진 크기가 너무 큽니다. (20mb 제한)");
          }
          String fileExt = fIleUtils.getExtension(photo);
          if (!Arrays.asList(fileType).contains(fileExt)) {
            return ResponseEntity.ok("잘못된 확장자 입니다.");
          }
        }

        List<Photo> photoList = fIleUtils.uploadFiles(files, request.getHeader("nickname"));

        for (int i = 0; i < photoList.size(); i++) {
          photoList.get(i).setSeq(i + 1);
          photoList.get(i).setId(id);
        }
        System.out.println("photoList = " + photoList);
        mapService.mapPhotoUpload(photoList);
      }

      // jwt인증 없으면 메세지 출력
      else return new ResponseEntity("인증이 필요합니다", HttpStatus.OK);
    }

    mapService.mapCre(params);
    System.out.println("create의 params = " + params);
    System.out.println("생성됨");
    return new ResponseEntity(params, HttpStatus.OK);
  }

  /*
   * 지도 데이터 수정
   * param - com.poten.basket.Poten.VO.MapRequest
   * */
  @PutMapping("/spot/update")
  public ResponseEntity updateSpot(
    HttpServletRequest request,
    HttpServletResponse response,
    @RequestPart MapRequest params,
    @RequestPart(required = false) List<MultipartFile> files
  ) throws ServletException, IOException {
    System.out.println("====================update====================");
    if (files != null) {

      // jwt 토큰이 유효할 때만 사진 수정
      if(jwtTokenUtil.validateJwtToken(request, response)) {
        for (MultipartFile photo : files) {
          if (photo.getSize() > 20971520) {
            return ResponseEntity.ok("사진 크기가 너무 큽니다. (20mb 제한)");
          }
          String fileExt = fIleUtils.getExtension(photo);
          if (!Arrays.asList(fileType).contains(fileExt)) {
            return ResponseEntity.ok("잘못된 확장자 입니다.");
          }
        }

        List<Photo> photoList = fIleUtils.uploadFiles(files, request.getHeader("nickname"));

        Integer id = params.getId();
        fIleUtils.deleteFiles(id);
        mapService.delPhoto(id);
        for (int i = 0; i < photoList.size(); i++) {
          photoList.get(i).setSeq(i + 1);
          photoList.get(i).setId(id);
        }

        mapService.mapPhotoUpload(photoList);
      }

      // jwt인증 없으면 메세지 출력
      else return new ResponseEntity("인증이 필요합니다", HttpStatus.OK);

    }
    System.out.println("update의 params = " + params);
    mapService.mapUpt(params);

    return new ResponseEntity(params, HttpStatus.OK);
  }

  @PostMapping("/feedback")
  public ResponseEntity feedback(
    @RequestParam int fdRating,
    @RequestParam String fdComment
  ) {
    HashMap<String, Object> params = new HashMap<>();
    params.put("fdRating", fdRating);
    params.put("fdComment", fdComment);
    mapService.feedback(params);
    return new ResponseEntity(params, HttpStatus.OK);
  }

  @GetMapping("/admin/login")
  public ResponseEntity adminLogin(@PathVariable String password) {
    String loginStatus = "FAIL";
    if (password == "test") {
      loginStatus = "SUCCESS";
    }
    return ResponseEntity.ok(loginStatus);
  }

  @GetMapping("/admin/feedback/read")
  public ResponseEntity getFeedbacks() {
    List<Feedbacks> feedbacks = mapService.getFeedbacks();
    return ResponseEntity.ok(feedbacks);
  }
}
