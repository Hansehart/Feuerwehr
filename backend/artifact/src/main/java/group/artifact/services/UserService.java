package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.dtos.ProfileDTO;
import group.artifact.models.Session;
import group.artifact.models.User;
import group.artifact.repositories.SessionRepository;
import group.artifact.repositories.UserRepository;
import jakarta.servlet.http.Cookie;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    SessionRepository sessionRepository;

    private final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?=";

    public Cookie saveAccount(User u) {
        // update user
        String salt = generateSalt(16);
        String hashedPW = DigestUtils.sha256Hex(u.getPassword() + salt);
        u.setPassword(hashedPW);
        u.setSalt(salt);

        // generate session cookie
        String sid = generateSalt(32);
        Cookie cookie = new Cookie("sid", sid);
        cookie.setAttribute("SameSite", "Lax");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        // generate session
        Session s = new Session();
        s.setSid(sid);
        s.setUser(u);

        // save entities
        System.out.println("111");
        sessionRepository.save(s);
        System.out.println("222");
        userRepository.save(u);

        return cookie;
    }

    public void saveProfile(String sid, ProfileDTO p) { // profile
        Session s = sessionRepository.findById(sid).orElse(null);
        System.out.println(s);
        if (s.equals(null)) {
            System.out.println("ERROR: provided sid is not suitable during profile creation");
            throw new IllegalArgumentException();
        }
        User u = s.getUser();
        u.setName(p.getUsername());
        userRepository.save(u);
    }

    /*
     * generates a random string
     * 
     * @value: length
     * 
     * @return: salt
     */
    private String generateSalt(int length) {
        if (length <= 0) {
            System.out.println("ERROR: creating salt requires a minimum length of 1");
            throw new IllegalArgumentException();
        }

        SecureRandom random = new SecureRandom();
        StringBuilder salt = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            salt.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }

        return salt.toString();
    }
}
