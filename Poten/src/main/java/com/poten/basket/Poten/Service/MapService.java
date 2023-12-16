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
        List<MapResponse> mapResponseList = new ArrayList<>();
        List<Map<String, Object>> mapPhotoList = new ArrayList<>();
        if (!mapPhotoList.isEmpty()){
            for (int i = 0; i < mapPhotoList.size(); i++){
                mapResponseList.get(i).setPhoto(mapPhotoList.get(i));
            }

        }
        return mapResponseList;
    }

    public void visitCounting() {mapDAO.visitCounting();}

    public int visitCount() {return mapDAO.visitCount();}

    public void mapCre(MapRequest params){
        mapDAO.mapCre(params);
        if (!params.getPhoto().isEmpty()){
            mapDAO.mapPhotoCre(params);
        }
    }

    public int getLastID(){
        return mapDAO.getLastID();
    };

    public void mapUpt(MapRequest params){
        mapDAO.mapUpt(params);
        if (!params.getPhoto().isEmpty()){
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

}
