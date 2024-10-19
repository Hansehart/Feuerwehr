package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.ContainerDTO;
import group.artifact.services.TrainingBotService;

@RestController
@RequestMapping("/api/service")
public class TrainingBotController {

    @Autowired
    TrainingBotService botService;

    @PostMapping("/receive/response")
    public ResponseEntity<ContainerDTO<String>> receiveResponse(@RequestBody ContainerDTO<String> msg) {
        try {
            String answer = botService.sendRequest(msg.getContent());
            ContainerDTO<String> repsonse = new ContainerDTO<>();
            repsonse.setContent(answer);
            return ResponseEntity.ok(repsonse);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
