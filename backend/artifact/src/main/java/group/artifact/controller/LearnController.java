package group.artifact.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Answer;
import group.artifact.models.Quiz;
import group.artifact.repositories.AnswerRepository;
import group.artifact.repositories.QuizRepository;

@RestController
@RequestMapping("/api/service")
public class LearnController {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    AnswerRepository answerRepository;

    @GetMapping("/receive/quiz")
    public Optional<Quiz> receiveQuiz() {
        return quizRepository.findById(1);
    }

    @GetMapping("/receive/answers")
    public List<Answer> receiveAnswers(@RequestParam(required = true) Integer quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isPresent()) {
            return quiz.get().getAnswers();
        }
        System.out.println("ERROR: no corresponding answers for provided quiz id");
        return null;
    }

    @PostMapping("/save/quiz")
    public void saveQuiz(@RequestBody Quiz quiz) {
        quizRepository.save(quiz);
    }

    @PostMapping("/save/answer")
    public void saveAnswer(@RequestBody Answer answer) {
        answerRepository.save(answer);
    }
}
