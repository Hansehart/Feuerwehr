package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.ProfileDTO;
import group.artifact.models.User;
import group.artifact.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/service")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save/account")
    public ResponseEntity<String> saveAccount(@RequestBody User u, HttpServletResponse response) {
        try {
            Cookie cookie = userService.saveAccount(u);
            response.addCookie(cookie);
            return ResponseEntity.ok("account successfully created");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/profile")
    public ResponseEntity<String> saveProfile(@CookieValue(value = "sid") String sid, @RequestBody ProfileDTO profile) {
        try {
            userService.saveProfile(sid, profile);
            return ResponseEntity.ok("profile successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}