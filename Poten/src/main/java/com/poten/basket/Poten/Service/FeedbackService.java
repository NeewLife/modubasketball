package com.poten.basket.Poten.Service;

import com.poten.basket.Poten.DAO.FeedbackDAO;
import com.poten.basket.Poten.VO.Feedbacks;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {

  private final FeedbackDAO feedbackDAO;

  public List<Feedbacks> getFeedbackAll(int currPage, int prePerPage) {
    return feedbackDAO.getFeedbackAll((currPage - 1) * prePerPage, prePerPage);
  }
}
