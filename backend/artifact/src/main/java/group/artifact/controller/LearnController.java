package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.QuizDTO;
import group.artifact.models.Question;
import group.artifact.models.Selection;
import group.artifact.repositories.SelectionRepository;
import group.artifact.repositories.QuestionRepository;

@RestController
@RequestMapping("/api/service")
public class LearnController {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SelectionRepository selectionRepository;

    @GetMapping("/receive/quiz")
    public QuizDTO receiveQuiz() {
        return null; // TODO
    }

    @PostMapping("/save/quiz")
    public ResponseEntity<String> saveQuiz(QuizDTO quiz) {
        try {
            Question q = new Question();
            q.setText(quiz.getText()); // extract question from quizdto
            questionRepository.save(q);
            for (int i = 0; i < quiz.getSelections().length; i++) {
                Selection s = new Selection();
                s.setAnswer(quiz.getSelections()[i]);
                s.setSolution(i == quiz.getSolutionIndex());
                s.setQuestion(q);
                selectionRepository.save(s);
            }
            return ResponseEntity.ok("Quiz created successfully.");
        } catch (Exception e) {
            System.out.println("ERROR: failed to create quiz");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to create quiz");
        }
    }

    /**
     * @PostMapping("/save/question")
     * public void saveQuestion(@RequestBody Question question) {
     * questionRepository.save(question);
     * }
     * 
     * @PostMapping("/save/selection")
     * public void saveAnswer(@RequestBody SelectionDTO selectionDTO) {
     * Optional<Question> question =
     * questionRepository.findById(selectionDTO.getQuizId());
     * if (question.isPresent()) {
     * Selection selection = new Selection();
     * selection.setSolution(selectionDTO.isSolution());
     * selection.setAnswer(selectionDTO.getAnswer());
     * selection.setQuiz(question.get());
     * selectionRepository.save(selection);
     * return;
     * }
     * System.out.println("ERROR: no corresponding selections for provided question
     * id");
     * }
     */
}
