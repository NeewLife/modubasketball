package com.poten.basket.Poten.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    private Integer id;
    private Integer seq;
    private String saveName;
    private String originalName;
    private String uploadPath;
    private byte[] photoByteData;

    private String photoUploadDate;
    private String nickname;
}
