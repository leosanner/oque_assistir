package com.oqueassistir.server.recommendation.shared.domain.assistant;

import com.oqueassistir.server.kernel.environment.AiModelEnvironment;
import dev.langchain4j.service.AiServices;
import org.springframework.stereotype.Component;

@Component
public class AssistantFactory {

    private final AiModelEnvironment environment;

    public AssistantFactory(AiModelEnvironment environment) {
        this.environment = environment;
    }

    public Assistant create(Provider provider) {
        return AiServices.builder(Assistant.class)
                .chatModel(provider.createChatModel(environment))
                .tools()
                .systemMessage("Mock test system prompt")
                .build();
    }
}
