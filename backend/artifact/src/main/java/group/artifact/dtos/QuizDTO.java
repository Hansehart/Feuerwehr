package group.artifact.dtos;

import java.util.List;

import lombok.Data;

@Data
public class QuizDTO {
    private Integer qid; // question id
    private String text; // question
    private String category;
    private List<Integer> solutionIndexes;
    private String[] selections;
}
