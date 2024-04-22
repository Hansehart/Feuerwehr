package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.dtos.ProfileDTO;
import group.artifact.models.User;
import group.artifact.repositories.UserRepository;
import jakarta.servlet.http.Cookie;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    private final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?=";

    public Cookie saveAccount(User u) {
        String hashedPW = DigestUtils.sha256Hex(u.getPassword());
        u.setPassword(hashedPW);
        u.setSalt(generateSalt(10));
        userRepository.save(u);

        String sid = generateSalt(32);
        Cookie cookie = new Cookie("sid", sid);
        cookie.setAttribute("SameSite", "Lax");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }

    public void saveProfile(String sid, ProfileDTO p) { // profile
        System.out.println(sid);
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
