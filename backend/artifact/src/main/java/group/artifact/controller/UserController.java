package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.User;
import group.artifact.services.UserService;

@RestController
@RequestMapping("/api/service")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save/user")
    public ResponseEntity<String> saveUser(@RequestBody User u) {
            userService.save(u);
            return ResponseEntity.ok("user successfully created");
       
    }
}