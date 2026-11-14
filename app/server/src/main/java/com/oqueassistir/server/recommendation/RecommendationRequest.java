package com.oqueassistir.server.recommendation;

import com.oqueassistir.server.recommendation.shared.domain.assistant.Provider;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RecommendationRequest(
        @NotBlank String message,
        @NotNull Provider provider
) {
}
