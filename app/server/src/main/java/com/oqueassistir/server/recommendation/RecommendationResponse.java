package com.oqueassistir.server.recommendation;

public record RecommendationResponse(
        String modelResponse
) {
    public static RecommendationResponse fromDTO(RecommendationDTO dto) {
        return new RecommendationResponse(dto.modelResponse());
    }
}
