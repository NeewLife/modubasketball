package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.MapService;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    List<MapResponse> mapList = mapService.mapList();
    return ResponseEntity.ok(mapList);
  }

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
  public ResponseEntity saveSpot(@RequestBody MapRequest params) {
    System.out.println("====================create====================");
    System.out.println("create의 params = " + params);
    mapService.mapCre(params);
    System.out.println("생성됨");
    return new ResponseEntity(params, HttpStatus.OK);
  }

  /*
   * 지도 데이터 삭제
   * 필요 params - lat(위도), lon(경도)
   * */

  @DeleteMapping("/spot/delete/{id}")
  public ResponseEntity deleteSpot(@PathVariable int id) {
    System.out.println("====================delete====================");
    System.out.println(id);
    mapService.mapDel(id);
    System.out.println("삭제됨");
    return new ResponseEntity(id, HttpStatus.OK);
  }

  /*
   * 지도 데이터 수정
   * 필요 params - com.poten.basket.Poten.VO.MapRequest
   * */
  @PutMapping("/spot/update")
  public ResponseEntity updateSpot(@RequestBody MapRequest params) {
    System.out.println("====================update====================");
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
}