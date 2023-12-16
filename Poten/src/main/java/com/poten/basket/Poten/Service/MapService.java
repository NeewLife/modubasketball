package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MapService {

    @Autowired
    MapDAO mapDAO;

    public List<MapResponse> mapList() {
        List<MapResponse> mapResponseList = mapDAO.mapList();
        for (int i = 0; i < mapResponseList.size(); i++){
            mapResponseList.get(i).setPhotoList(mapDAO.mapPhotoList());
        }
        return mapResponseList;
    }

    public void visitCounting() {mapDAO.visitCounting();}

    public int visitCount() {return mapDAO.visitCount();}

    public void mapCre(MapRequest params){
        mapDAO.mapCre(params);
        if (!params.getPhotoList().isEmpty()){
            mapDAO.mapPhotoUpload(params);
        }
    }

    public int getLastID(){
        return mapDAO.getLastID();
    };

    public void mapUpt(MapRequest params){
        mapDAO.mapUpt(params);
        if (!params.getPhotoList().isEmpty()){
            mapDAO.mapPhotoUpload(params);
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

    public void delPhoto(Integer id) {
        mapDAO.delPhoto(id);
    }
}
