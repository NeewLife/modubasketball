package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FeedbackController {

  private final FeedbackService feedbackService;

  @GetMapping("/admin/feedback/{currPage}")
  public ResponseEntity<?> getFeedbackAll(
    @PathVariable(value = "currPage", required = true) int currPage
  ) {
    return ResponseEntity.ok(feedbackService.getFeedbackAll(currPage, 20));
  }
}
