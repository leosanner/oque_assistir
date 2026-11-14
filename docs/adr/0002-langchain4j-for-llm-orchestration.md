# LangChain4j for LLM orchestration

The server talks to the language model through LangChain4j (AI Services, tools, chat memory) instead of calling a provider SDK directly or using Spring AI. Part of the project's purpose is to explore observability of an LLM application, and LangChain4j gives one place to hook into model calls, tool calls, and token usage regardless of the model provider behind it.

## Considered Options

- **Spring AI**: fits the Spring Boot server naturally, but the project deliberately wants to learn LangChain4j's model.
- **Provider SDK directly**: least abstraction, but ties the code to one provider and leaves tool calling, memory, and instrumentation to be hand-built.
