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
import group.artifact.models.Question;
import group.artifact.repositories.SelectionRepository;
import group.artifact.repositories.QuestionRepository;

@RestController
@RequestMapping("/api/service")
public class LearnController {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SelectionRepository selectionRepository;

    @GetMapping("/receive/question")
    public Optional<Question> receiveQuiz() {
        return questionRepository.findById(0);
    }

    @GetMapping("/receive/selections")
    public List<Selection> receiveAnswers(@RequestParam(required = true) Integer questionId) {
        Optional<Question> question = questionRepository.findById(questionId);
        if (question.isPresent()) {
            // TODO
        }
        System.out.println("ERROR: no corresponding selections for provided question id");
        return null;
    }

    @PostMapping("/save/question")
    public void saveQuiz(@RequestBody Question question) {
        questionRepository.save(question);
    }

    @PostMapping("/save/selection")
    public void saveAnswer(@RequestBody SelectionDTO selectionDTO) {
        Optional<Question> question = questionRepository.findById(selectionDTO.getQuizId());
        if (question.isPresent()) {
            Selection selection = new Selection();
            selection.setSolution(selectionDTO.isSolution());
            selection.setAnswer(selectionDTO.getAnswer());
            selection.setQuiz(question.get());
            selectionRepository.save(selection);
            return;
        }
        System.out.println("ERROR: no corresponding selections for provided question id");
    }
}
