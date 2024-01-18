package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.MapService;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import com.poten.basket.Poten.VO.Photo;
import com.poten.basket.Poten.utils.FIleUtils;
import com.poten.basket.Poten.utils.JwtTokenUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
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
  public ResponseEntity<?> saveSpot(@RequestBody MapRequest params)
    throws Exception {
    System.out.println("====================create====================");
    Integer id = mapService.getLastID();
    params.setId(id);
    System.out.println("params = " + params);

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
  public ResponseEntity<?> updateSpot(@RequestBody MapRequest params)
    throws ServletException, IOException {
    System.out.println("====================update====================");
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
