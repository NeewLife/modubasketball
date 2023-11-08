package com.poten.basket.Poten.VO;

import lombok.Data;

@Data
public class MapResponse {

    // 조회용 map 데이터 양식
    private double lat;         // 위도
    private double lon;         // 경도
    private String courtType;   // 코트 종류
    private String feeYn;       // 사용료
    private String courtSize;   // 코트 사이즈
    private String goalPost;    // 골대 수
    private String parkYn;      // 주차 가능여부
    private String createDate;  // 생성 날짜
    private String modifyDate;  // 수정 날짜
    private String address;          // 주소
    private String comment;    // 기타 정보란
    private String courtName;   // 코트 고유명
}
