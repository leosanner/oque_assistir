package com.oqueassistir.server.recommendation;

import com.oqueassistir.server.recommendation.shared.http.Routing;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Routing.V1_RECOMMENDATION_PATH)
public class RecommendationController {

    private final RecommendationUseCase recommendationUseCase;

    public RecommendationController(RecommendationUseCase recommendationUseCase) {
        this.recommendationUseCase = recommendationUseCase;
    }

    @PostMapping("/")
    public ResponseEntity<RecommendationResponse> recommendation(
            @RequestBody @Valid RecommendationRequest request
    ) {
        var responseDTO =  recommendationUseCase.execute(request);

        return new ResponseEntity<>(RecommendationResponse.fromDTO(responseDTO), HttpStatus.OK);
    }
}
