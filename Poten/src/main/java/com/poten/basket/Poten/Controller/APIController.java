package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.MapService;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;

import java.util.*;

import com.poten.basket.Poten.VO.Photo;
import jakarta.validation.Valid;
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

  /*
   * 지도 리스트 조회
   * return값 - mapList(List 형태의 전체 지도 데이터)
   * return 지도 데이터 형식 - com.poten.basket.Poten.VO.MapResponse
   * */
  @GetMapping("/")
  public ResponseEntity<List<MapResponse>> openMap() {
    HttpHeaders headers = new HttpHeaders();
    headers.setCacheControl(CacheControl.noCache().mustRevalidate());
    List<MapResponse> mapList = mapService.mapList();
    return ResponseEntity.ok(mapList);
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
   * 필요 params - com.poten.basket.Poten.VO.MapRequest
   * */
  @PostMapping("/spot/create")
  public ResponseEntity saveSpot(@RequestBody MapRequest params,
                                 @Valid @RequestBody List<Photo> photo)
                        throws Exception{
    System.out.println("====================create====================");
    Integer id = mapService.getLastID();
    params.setId(id);
    System.out.println("photo = " + photo);

    if (!photo.isEmpty()){
      System.out.println("photo = " + photo);
      for (int i = 0; i < photo.size(); i++){
        UUID uuid = UUID.randomUUID();
        String photoName = photo.get(i).getPhotoName();
        photo.get(i).setPhotoName(uuid + "_" + photoName);
        photo.get(i).setSeq(i + 1);
        photo.get(i).setId(id);
      }
    };

    mapService.mapCre(params);
    System.out.println("create의 params = " + params);
    System.out.println("생성됨");
    return new ResponseEntity(params, HttpStatus.OK);
  }

  /*
   * 지도 데이터 삭제 요청
   * 필요 params - id
   * */
  @PutMapping("/spot/delete/{id}")
  public ResponseEntity deleteReqSpot(@PathVariable int id) {
    System.out.println("====================deleteReq====================");
    System.out.println(id);
    mapService.mapDelRequest(id);
    System.out.println("삭제 요청됨");
    return new ResponseEntity(id, HttpStatus.OK);
  }

  /*
   * 지도 데이터 수정
   * 필요 params - com.poten.basket.Poten.VO.MapRequest
   * */
  @PutMapping("/spot/update")
  public ResponseEntity updateSpot(@RequestBody MapRequest params
                                 , @RequestParam(required = false, value = "photo") List<Photo> photo){
    System.out.println("====================update====================");
    if (!params.getPhotoList().isEmpty()){
      Integer id = params.getId();
      mapService.delPhoto(id);
      System.out.println("photo = " + photo);
      for (int i = 0; i < photo.size(); i++){
        UUID uuid = UUID.randomUUID();
        String photoName = photo.get(i).getPhotoName();
        photo.get(i).setPhotoName(uuid + "_" + photoName);
        photo.get(i).setSeq(i + 1);
        photo.get(i).setId(id);
      }
    }
    System.out.println("update의 params = " + params);
    mapService.mapUpt(params);

    return new ResponseEntity(params, HttpStatus.OK);
  }

  @PostMapping("/feedback")
  public ResponseEntity feedback(@RequestParam int fdRating
                               , @RequestParam String fdComment){
      HashMap<String, Object> params = new HashMap<>();
      params.put("fdRating", fdRating);
      params.put("fdComment", fdComment);
      mapService.feedback(params);
      return new ResponseEntity(params, HttpStatus.OK);
  }

  @GetMapping("/admin/login")
  public ResponseEntity adminLogin(@PathVariable String password){
    String loginStatus = "FAIL";
    if (password == "test"){
      loginStatus = "SUCCESS";
    }
    return ResponseEntity.ok(loginStatus);
  }

  @GetMapping("/admin/feedback/read")
  public ResponseEntity getFeedbacks() {
    List<Feedbacks> feedbacks = mapService.getFeedbacks();
    return ResponseEntity.ok(feedbacks);
  }

  @GetMapping("/admin/spot")
  public ResponseEntity<Map<String, List<MapResponse>>> getAdminMap() {
    Map<String, List<MapResponse>> mapReqList = mapService.mapReqList();
    return ResponseEntity.ok(mapReqList);
  }

  @PutMapping("/admin/delete-reject/{id}")
  public ResponseEntity deleteRejectSpot(@PathVariable int id) {
    System.out.println("====================deleteReject====================");
    System.out.println(id);
    mapService.mapDelReject(id);
    return new ResponseEntity(id, HttpStatus.OK);
  }

  /*
   * 관리자에서 지도 논리적삭제
   * 필요 params - id
   * */
  @PutMapping("/admin/delete/{id}")
  public ResponseEntity deleteSpot(@PathVariable int id) {
    System.out.println("====================delete====================");
    System.out.println(id);
    mapService.mapDel(id);
    System.out.println("삭제됨");
    return new ResponseEntity(id, HttpStatus.OK);
  }


}
