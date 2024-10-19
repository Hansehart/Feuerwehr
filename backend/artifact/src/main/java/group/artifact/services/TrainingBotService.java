package group.artifact.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

import java.util.Collections;

@Service
public class TrainingBotService {
    private final OpenAiService openAiService;

    public TrainingBotService(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.openAiService = new OpenAiService(apiKey);
    }

    public String sendRequest(String content) {
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
            .messages(Collections.singletonList(new ChatMessage("user", content)))
            .model("gpt-4o-mini")
            .maxTokens(150)
            .temperature(0.7)
            .build();

        try {
            return openAiService.createChatCompletion(chatCompletionRequest)
                .getChoices().get(0).getMessage().getContent().trim();
        } catch (Exception e) {
            System.out.println(e);
            return "An error occurred while processing your request.";
        }
    }
}