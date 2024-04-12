package group.artifact.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectionDTO {
    Integer quizId;
    boolean solution;
    String answer;
}
