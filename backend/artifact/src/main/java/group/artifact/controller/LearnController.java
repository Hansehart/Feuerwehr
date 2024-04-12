package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.QuizDTO;
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
    public void saveQuiz() {
        return; // TODO
    }

    /** 
    @PostMapping("/save/question")
    public void saveQuestion(@RequestBody Question question) {
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
    */
}
