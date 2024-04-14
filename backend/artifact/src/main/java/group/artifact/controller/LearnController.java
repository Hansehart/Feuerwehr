package group.artifact.controller;

import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<QuizDTO> receiveQuiz(@RequestParam(required = false) Integer qid) { // question id
        Question question;
        if (qid == null) { // choose a random question
            List<Question> allQuestions = questionRepository.findAll();
            Random random = new Random();
            question = allQuestions.get(random.nextInt(allQuestions.size()));
        } else { // select quesito by id
            question = questionRepository.findById(qid).orElse(null);
        }

        if (question == null) {
            return ResponseEntity.notFound().build();
        }
        QuizDTO quiz = new QuizDTO();
        quiz.setText(question.getText());

        List<Selection> selections = selectionRepository.findByQuestion(question);
        String[] s = selections.stream()
                .map(Selection::getAnswer)
                .toArray(String[]::new);
        quiz.setSelections(s);

        List<Integer> indexes = new LinkedList<>();
        for (int i = 0; i < selections.size(); i++) {
            if (selections.get(i).isSolution()) {
                indexes.add(i);
            }
        }
        quiz.setSolutionIndexes(indexes);
        return ResponseEntity.ok(quiz);
    }

    @PostMapping("/save/quiz")
    public ResponseEntity<String> saveQuiz(@RequestBody QuizDTO quiz) {
        try {
            Question q = new Question();
            q.setText(quiz.getText()); // extract question from quizdto
            questionRepository.save(q);

            List<Integer> indexes = quiz.getSolutionIndexes();
            for (int i = 0; i < quiz.getSelections().length; i++) {
                Selection s = new Selection();
                s.setAnswer(quiz.getSelections()[i]);
                s.setSolution(indexes.contains(i));
                s.setQuestion(q);
                selectionRepository.save(s);
            }
            return ResponseEntity.ok("quiz created successfully");
        } catch (Exception e) {
            System.out.println("ERROR: failed to create quiz");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to create quiz");
        }
    }
}
