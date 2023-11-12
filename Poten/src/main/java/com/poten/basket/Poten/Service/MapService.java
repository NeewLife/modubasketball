package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.MapDAO;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class MapService {

    @Autowired
    MapDAO mapDAO;

    public List<MapResponse> mapList() {
        mapDAO.visitCount();
        return mapDAO.mapList();
    }

    public int visitCount() {return mapDAO.visitCount();}

    public void mapCre(MapRequest params){
        mapDAO.mapCre(params);
    }

    public void mapUpt(MapRequest params){
        mapDAO.mapUpt(params);
    }

    public void mapDel(int params){
        mapDAO.mapDel(params);
    }

    public void feedback(HashMap<String, Object> params){mapDAO.feedback(params);}
}
