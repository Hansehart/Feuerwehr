package group.artifact.controller;

import java.util.List;

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
    QuizService quizService;

    @GetMapping("/receive/quiz")
    public ResponseEntity<QuizDTO> receiveQuiz(@RequestParam(required = true) String category) { // question id
        try {
            if (category == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            QuizDTO q = quizService.receive(category);
            return ResponseEntity.ok(q);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/quiz")
    public ResponseEntity<String> saveQuiz(@RequestBody QuizDTO quiz) {
        try {
            quizService.save(quiz);
            return ResponseEntity.ok("quiz successfully created");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/quiz-categories")
    public ResponseEntity<List<String>> receiveCategories() {
        try {
            List<String> categories = quizService.receiveCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/quiz-progress")
    public ResponseEntity<ContainerDTO<Integer>> receiveProgress(
            @CookieValue(name = "sid", required = true) String sid) {
        try {
            ContainerDTO<Boolean> msg = userService.authUser(sid);
            if (msg.getContent()) { // user is authenticated
                Integer progress = quizService.receiveProgress(sid);
                return ResponseEntity.ok(new ContainerDTO<Integer>(progress));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/quiz-progress")
    public ResponseEntity<String> saveProgress(@RequestBody ContainerDTO<Integer> container,
            @CookieValue(name = "sid", required = true) String sid) { // question id
        try {
            ContainerDTO<Boolean> msg = userService.authUser(sid);
            if (msg.getContent()) { // user is authenticated
                Integer qid = container.getContent();
                Boolean success = quizService.saveProgress(qid, sid);
                if (success) {
                    return ResponseEntity.ok("progress successfully saved");
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
