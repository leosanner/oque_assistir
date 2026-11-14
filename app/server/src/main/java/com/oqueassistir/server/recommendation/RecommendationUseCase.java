package com.oqueassistir.server.recommendation;

import com.oqueassistir.server.recommendation.shared.domain.assistant.Assistant;
import com.oqueassistir.server.recommendation.shared.domain.assistant.AssistantFactory;
import org.springframework.stereotype.Service;

@Service
public class RecommendationUseCase {

    private final AssistantFactory assistantFactory;

    public RecommendationUseCase(AssistantFactory assistantFactory) {
        this.assistantFactory = assistantFactory;
    }

    public RecommendationDTO execute(RecommendationRequest request) {
        var assistant = assistantFactory.create(request.provider());
        return new RecommendationDTO(assistant.chat(request.message()));
    }
}
