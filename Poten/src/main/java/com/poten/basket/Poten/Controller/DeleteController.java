package com.poten.basket.Poten.Controller;

import com.poten.basket.Poten.Service.DeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/delete")
@RequiredArgsConstructor
public class DeleteController {

  private final DeleteService deleteService;

  @GetMapping("/{state}")
  public ResponseEntity<?> getBasketSpotByState(
    @PathVariable(value = "state", required = true) int state
  ) {
    return ResponseEntity.ok(deleteService.getBasketSpotByState(state));
  }

  @PutMapping("/")
  public ResponseEntity<?> modifyBasketSpotDelete(
    @RequestParam(value = "id", required = true) int id
  ) {
    deleteService.modifyBasketSpotDelete(id);

    return ResponseEntity.ok(id);
  }

  @PutMapping("/state")
  public ResponseEntity<?> modifyBasketSpotDeleteByState(
    @RequestParam(value = "state", required = true) int state,
    @RequestParam(value = "id", required = true) int id
  ) {
    deleteService.modifyBasketSpotDeleteByState(state, id);

    return ResponseEntity.ok(id);
  }
}
