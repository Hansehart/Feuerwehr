package group.artifact.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class QuestionBotService {
    private final OpenAiService openAiService;
    private final List<String> feuerwehrKeywords = Arrays.asList(
            "feuerwehr", "brand", "löschen", "rettung", "einsatz", "notruf", "112", "hydrant",
            "löschfahrzeug", "feuerlöscher", "rauchmelder", "brandschutz", "retten", "löschen", "bergen", "schützen"
    );

    public QuestionBotService(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.openAiService = new OpenAiService(apiKey);
    }

    public String sendRequest(String content) {
        if (!isFireDepartmentRelated(content)) {
            return "Bitte stellen Sie eine Frage, die mit der Feuerwehr zu tun hat. "
                    + "Wenn Du Hilfe benötigst, frage zum Beispiel: 'Was macht die Feuerwehr?' "
                    + "oder 'Wie kann ich einen Brand löschen?'";
        }

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
            return "Leider funktioniert etwas nicht. Wir haben den Vorfall erkannt und kümmern uns!";
        }
    }

    private boolean isFireDepartmentRelated(String content) {
        String lowerCaseContent = content.toLowerCase();
        return feuerwehrKeywords.stream().anyMatch(lowerCaseContent::contains);
    }
}