package com.poten.basket.Poten.utils;

import com.poten.basket.Poten.VO.Photo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FIleUtils {

    // 서버 업로드 경로
    String applicationDirectory = System.getProperty("user.dir");

    @Value("${file.upload.directory}")
    String uploadPath;

    // 테스트용 업로드 경로
//    private final String uploadPath = Paths.get("D:", "java", "Project", "modubasketball", "Poten", "uingx", "public").toString();

    public List<Photo> uploadFiles(final List<MultipartFile> multipartFiles, String nickname) {
        List<Photo> files = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if (multipartFile.isEmpty()) {
                continue;
            }
            files.add(uploadFile(multipartFile,nickname));
        }
        return files;
    }

    /**
     * 단일 파일 업로드
     *
     * @param multipartFile - 파일 객체
     * @return DB에 저장할 파일 정보
     */
    public Photo uploadFile(final MultipartFile multipartFile, String nickname) {

        if (multipartFile.isEmpty()) {
            return null;
        }

        String saveName = generateSaveFilename(multipartFile.getOriginalFilename());
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd")).toString();
        Path uploadPath = Paths.get(makeDirectory(today) + File.separator + saveName);


        try {
            byte[] bytes = multipartFile.getBytes();
            Files.write(uploadPath, bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return Photo.builder()
                .originalName(multipartFile.getOriginalFilename())
                .nickname(nickname)
                .saveName(saveName)
                .uploadPath(uploadPath.toString())
                .build();
    }

    public String getExtension(MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        return extension;
    }

    /**
     * 저장 파일명 생성
     *
     * @param filename 원본 파일명
     * @return 디스크에 저장할 파일명
     */
    private String generateSaveFilename(final String filename) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String extension = StringUtils.getFilenameExtension(filename);
        return uuid + "." + extension;
    }

    private String makeDirectory(String path) {
        File dir = new File(uploadPath + File.separator + path);

        if (dir.exists() == false) {
            dir.mkdirs();
        }
        return dir.getPath();
    }
}
