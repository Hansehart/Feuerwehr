package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.ContainerDTO;
import group.artifact.dtos.QuizDTO;
import group.artifact.services.QuizService;
import group.artifact.services.UserService;

@RestController
@RequestMapping("/api/service")
public class QuizController {

    @Autowired
    UserService userService;

    @Autowired
    QuizService learnService;

    @GetMapping("/receive/quiz")
    public ResponseEntity<QuizDTO> receiveQuiz(@RequestParam(required = false) Integer qid) { // question id
        try {
            QuizDTO q = learnService.receiveRand(qid);
            return ResponseEntity.ok(q);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/quiz")
    public ResponseEntity<String> saveQuiz(@RequestBody QuizDTO quiz) {
        try {
            learnService.save(quiz);
            return ResponseEntity.ok("quiz successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/quiz-progress")
    public ResponseEntity<String> saveProgress(@RequestBody Integer qid,
            @CookieValue(name = "sid", required = true) String sid) { // question id
        try {
            ContainerDTO<Boolean> msg = userService.authUser(sid);
            if (msg.getContent()) {
                Boolean success = learnService.saveProgress(qid, sid);
                if (success) {
                    return ResponseEntity.ok("progress successfully saved");
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
