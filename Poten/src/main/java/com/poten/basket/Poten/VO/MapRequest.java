package com.poten.basket.Poten.VO;

import lombok.Data;

@Data
public class MapRequest {

  private Integer id;
  // 입력 or 수정용 데이터 양식
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
}
