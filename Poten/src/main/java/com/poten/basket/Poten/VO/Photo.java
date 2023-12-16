package com.poten.basket.Poten.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    private Integer id;
    private Integer seq;
    private String photoName;
    private String photoUploadDate;
    private String nickname;
}
