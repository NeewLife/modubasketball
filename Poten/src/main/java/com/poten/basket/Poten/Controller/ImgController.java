package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.ImgService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/img")
@RequiredArgsConstructor
public class ImgController {

  private final ImgService imgService;

  @GetMapping(value = "/{name}", produces = MediaType.IMAGE_PNG_VALUE)
  public @ResponseBody void getImageWithMediaType(
    HttpServletResponse response,
    @PathVariable(value = "name", required = true) String name
  ) throws IOException {
    File file = imgService.getImage(name);

    FileInputStream inputStream = new FileInputStream(file);
    ServletOutputStream outputStream = response.getOutputStream();

    outputStream.write(IOUtils.toByteArray(inputStream));
  }
}
