package com.poten.basket.Poten.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    @Nullable
    private Integer id;
    private Integer seq;
    private String photoName;

    @Nullable
    private String photoUploadDate;
    private String nickname;
}
