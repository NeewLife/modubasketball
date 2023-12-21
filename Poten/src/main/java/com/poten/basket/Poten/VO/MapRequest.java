package com.poten.basket.Poten.VO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class MapRequest {

  // 입력 or 수정용 데이터 양식
  private Integer id;
  private double lat; // 위도
  private double lon; // 경도
  private String courtType; // 코트 종류
  private String feeYn; // 사용료
  private String courtSize; // 코트 사이즈
  private String goalPost; // 골대 수
  // private String showerYn;         // 샤워 가능여부
  private String parkYn; // 주차 가능여부
  private String address = ""; // 주소
  private String comment = ""; // 기타 정보란
  private String courtName = ""; // 코트 고유명
  private String hasLight; // 야간 조명여부
  private String lightTime; // 야간 조명시간
  private String openStatus; // 개방 타입
  private String openTime; // 개방 시간

}
