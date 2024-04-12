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

import group.artifact.models.Selection;
import group.artifact.dtos.SelectionDTO;
import group.artifact.models.Quiz;
import group.artifact.repositories.SelectionRepository;
import group.artifact.repositories.QuizRepository;

@RestController
@RequestMapping("/api/service")
public class LearnController {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    SelectionRepository selectionRepository;

    @GetMapping("/receive/quiz")
    public Optional<Quiz> receiveQuiz() {
        return quizRepository.findById(1);
    }

    @GetMapping("/receive/selections")
    public List<Selection> receiveAnswers(@RequestParam(required = true) Integer quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isPresent()) {
            return quiz.get().getSelections();
        }
        System.out.println("ERROR: no corresponding selections for provided quiz id");
        return null;
    }

    @PostMapping("/save/quiz")
    public void saveQuiz(@RequestBody Quiz quiz) {
        quizRepository.save(quiz);
    }

    @PostMapping("/save/selection")
    public void saveAnswer(@RequestBody SelectionDTO selectionDTO) {
        Optional<Quiz> quiz = quizRepository.findById(selectionDTO.getQuizId());
        if (quiz.isPresent()) {
            Selection selection = new Selection();
            selection.setSolution(selectionDTO.isSolution());
            selection.setAnswer(selectionDTO.getAnswer());
            selection.setQuiz(quiz.get());
            selectionRepository.save(selection);
            return;
        }
        System.out.println("ERROR: no corresponding selections for provided quiz id");
    }
}
