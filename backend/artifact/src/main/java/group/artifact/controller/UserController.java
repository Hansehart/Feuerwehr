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

import group.artifact.dtos.MessageDTO;
import group.artifact.dtos.ProfileDTO;
import group.artifact.dtos.UserDTO;
import group.artifact.models.User;
import group.artifact.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/service")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/auth")
    public ResponseEntity<MessageDTO<Boolean>> authenticate(@CookieValue(value = "sid", required = false) String sid) {
        MessageDTO<Boolean> msg = new MessageDTO<>();
        try {
            msg = userService.authUser(sid);
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<MessageDTO<String>> logout(@CookieValue(value = "sid", required = true) String sid, HttpServletResponse response) {
        try {

            Cookie cookie =  userService.logout(sid);
            if (cookie == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            response.addCookie(cookie);
            return ResponseEntity.ok(new MessageDTO<>("successfully logged out"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<MessageDTO<String>> login(@RequestBody UserDTO u, HttpServletResponse response) {
        try {
            Cookie cookie = userService.login(u);
            if (cookie == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            response.addCookie(cookie);
            return ResponseEntity.ok(new MessageDTO<>("successfully logged in"));
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/user")
    public ResponseEntity<MessageDTO<String>> receiveUserInformation(@CookieValue(value = "sid") String sid,
            @RequestParam(required = true) String attr) { // attribute
        try {
            MessageDTO<String> msg = userService.receiveUserAttr(sid, attr);
            if (msg == null) { // no user found for sid
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/account")
    public ResponseEntity<String> saveAccount(@RequestBody User u, HttpServletResponse response) {
        try {
            Cookie cookie = userService.saveAccount(u);
            if (cookie == null) { // e-mail already taken
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
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
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}