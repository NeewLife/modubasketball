package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.DeleteDAO;
import com.poten.basket.Poten.VO.MapResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeleteService {

  private final DeleteDAO deleteDAO;

  public List<MapResponse> getBasketSpotByState(int state) {
    return deleteDAO.getBasketSpotByState(state);
  }

  @Transactional
  public void modifyBasketSpotDelete(int id) {
    if (deleteDAO.getBasketSpotCount(id) == 0) {
      deleteDAO.addBasketSpotDelete(id);
    } else {
      deleteDAO.modifyBasketSpotDelete(id);
    }
  }

  @Transactional
  public void modifyBasketSpotDeleteByState(int state, int id) {
    deleteDAO.modifyBasketSpotDeleteByState(state, id);
  }
}
