package group.artifact.dtos;

import lombok.Data;

@Data
public class QuizDTO {
    private String text; // question
    private Integer solutionIndex;
    private String[] selections;
}
