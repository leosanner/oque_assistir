package com.oqueassistir.server.kernel.environment;

import org.springframework.stereotype.Service;

/**
 * Environment-driven settings for the AI model providers, one record per provider.
 */
@Service
public class AiModelEnvironment {

    private final OllamaSettings ollama;

    public AiModelEnvironment(OllamaSettings ollama) {
        this.ollama = ollama;
    }

    public OllamaSettings ollama() {
        return ollama;
    }
}
