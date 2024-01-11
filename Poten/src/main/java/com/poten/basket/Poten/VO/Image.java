package com.poten.basket.Poten.VO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Image {

  private String name;
  private String originalName;
  private String userNickname;
  private String ext;
  private Long size;
  private String createDate;
}
