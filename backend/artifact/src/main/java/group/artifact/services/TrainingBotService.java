package group.artifact.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

@Service
public class TrainingBotService {

    private final OpenAiService openAiService;

    public TrainingBotService(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.openAiService = new OpenAiService(apiKey);
    }

    public String sendRequest(String content) {
        CompletionRequest completionRequest = CompletionRequest.builder()
            .prompt(content)
            .model("gpt-4o-mini")
            .maxTokens(150)
            .temperature(0.7)
            .build();

        try {
            return openAiService.createCompletion(completionRequest)
                .getChoices().get(0).getText().trim();
        } catch (Exception e) {
            System.out.println(e);
            return "An error occurred while processing your request.";
        }
    }
}