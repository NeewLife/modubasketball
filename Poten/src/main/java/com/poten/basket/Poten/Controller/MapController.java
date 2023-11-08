package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.MapService;
import com.poten.basket.Poten.VO.MapRequest;
import com.poten.basket.Poten.VO.MapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;

@Controller
public class MapController {

    @Autowired
    MapService mapService;

    /*
    * 지도 리스트 조회
    * return값 - mapList(List 형태의 전체 지도 데이터)
    * return 지도 데이터 형식 - com.poten.basket.Poten.VO.MapResponse
    * */
    @RequestMapping("/")
    public String openMap(Model model){
        List<MapResponse> mapList = mapService.mapList();
        System.out.println("지도화면");
//        System.out.println("mapList = " + mapList);
        model.addAttribute("mapList", mapList);
        return "index";
    }

    /*
    * 지도 데이터 추가
    * 필요 params - com.poten.basket.Poten.VO.MapRequest
    * */
    @RequestMapping("/spot/create")
    public String saveSpot(MapRequest params){
        System.out.println("====================create====================");
        System.out.println("create의 params = " + params);
        mapService.mapCre(params);
        System.out.println("생성됨");
        return "redirect:/";
    }

    /*
    * 지도 데이터 삭제
    * 필요 params - lat(위도), lon(경도)
    * */
    @RequestMapping("/spot/delete")
    public String deleteSpot(@RequestParam double lat
                            , @RequestParam double lon){
        System.out.println("====================delete====================");
        System.out.println(lat + "," + lon);
        HashMap<String, Object> params = new HashMap<>();
        params.put("lat", lat);
        params.put("lon", lon);
        mapService.mapDel(params);
        System.out.println("삭제됨");
        return "redirect:/";
    }

    /*
    * 지도 데이터 수정
    * 필요 params - com.poten.basket.Poten.VO.MapRequest
    * */
    @RequestMapping("/spot/update")
    public String updateSpot(MapRequest params){
        System.out.println("====================update====================");
        System.out.println("update의 params = " + params);
        mapService.mapUpt(params);
        return "redirect:/";
    }

}
