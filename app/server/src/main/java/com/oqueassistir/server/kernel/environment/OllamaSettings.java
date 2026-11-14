package com.oqueassistir.server.kernel.environment;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Ollama connection settings, bound from {@code app.ollama.*} in application.yaml
 * (which maps OLLAMA_BASE_URL and OLLAMA_CHAT_MODEL).
 */
@Validated
@ConfigurationProperties(prefix = "app.ollama")
public record OllamaSettings(
        @NotBlank String baseUrl,
        @NotBlank String chatModel
) {
}
