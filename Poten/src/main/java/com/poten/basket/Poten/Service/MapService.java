package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

@Service
public class MapService {

    @Autowired
    MapDAO mapDAO;

    public List<MapResponse> mapList() {
        return mapDAO.mapList();
    }

    public void visitCounting() {mapDAO.visitCounting();}

    public int visitCount() {return mapDAO.visitCount();}

    public void mapCre(MapRequest params){
        mapDAO.mapCre(params);
    }

    public void mapUpt(MapRequest params, Map<String, Object> photoParams){
        mapDAO.mapUpt(params);
        if (!photoParams.isEmpty()){
            mapDAO.mapPhotoUpt(params);
        }
    }

    public void mapDelRequest(int params){
        mapDAO.mapDelRequest(params);
    }

    public void mapDel(int params){
        mapDAO.mapDel(params);
    }

    public void feedback(HashMap<String, Object> params){mapDAO.feedback(params);}

    public List<Feedbacks> getFeedbacks() {
        return mapDAO.getFeedbacks();
    }

    public Map<String, List<MapResponse>> mapReqList() {
        List<MapResponse> mapReqList = mapDAO.mapReqList();
        List<MapResponse> mapDelList = mapDAO.mapDelList();
        List<MapResponse> mapRejList = mapDAO.mapRejList();

        Map<String, List<MapResponse>> adminMapList = new HashMap<>();
        adminMapList.put("mapReqList", mapReqList);
        adminMapList.put("mapDelList", mapDelList);
        adminMapList.put("mapRejList", mapRejList);

        System.out.println("adminMapList = " + adminMapList);

        return adminMapList;
    }

    public void mapDelReject(int params){
        mapDAO.mapDelReject(params);
    }

    public void photoUpload(MapRequest params, MultipartFile file) throws Exception{
        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
        String projectPath = System.getProperty("user.dir") + "\\uingx\\public";

        /*식별자 . 랜덤으로 이름 만들어줌*/
        UUID uuid = UUID.randomUUID();

        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String fileName = uuid + "_" + file.getOriginalFilename();

        /*빈 껍데기 생성*/
        /*File을 생성할건데, 이름은 "name" 으로할거고, projectPath 라는 경로에 담긴다는 뜻*/
        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        /*디비에 파일 넣기*/
        board.setFilename(fileName);
        /*저장되는 경로*/
        board.setFilepath("/files/" + fileName); /*저장된파일의이름,저장된파일의경로*/

        /*파일 저장*/
        boardRepository.save(board);
    }

}
