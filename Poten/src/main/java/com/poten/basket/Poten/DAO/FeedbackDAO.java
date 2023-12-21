package com.poten.basket.Poten.DAO;

import com.poten.basket.Poten.VO.Feedbacks;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FeedbackDAO {
  List<Feedbacks> getFeedbackAll(int currPage, int prePerPage);
}
