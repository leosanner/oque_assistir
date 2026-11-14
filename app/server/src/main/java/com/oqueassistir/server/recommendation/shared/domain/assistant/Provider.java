package com.oqueassistir.server.recommendation.shared.domain.assistant;

import com.oqueassistir.server.kernel.environment.AiModelEnvironment;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.ollama.OllamaChatModel;

public enum Provider {
    OLLAMA;

    public ChatModel createChatModel(AiModelEnvironment environment) {
        switch (this) {
            case OLLAMA:
                var ollama = environment.ollama();
                return OllamaChatModel.builder()
                        .baseUrl(ollama.baseUrl())
                        .modelName(ollama.chatModel())
                        .temperature(0.7)
                        .build();

            default:
                return null;
        }
    }
}
