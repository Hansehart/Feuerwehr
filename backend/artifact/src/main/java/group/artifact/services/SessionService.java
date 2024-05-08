package group.artifact.services;

import java.security.SecureRandom;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Session;
import group.artifact.models.User;
import group.artifact.repositories.SessionRepository;
import jakarta.servlet.http.Cookie;

@Service
public class SessionService {
    @Autowired
    SessionRepository sessionRepository;

    private final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?=";

    public Session auth(String sid) {
        Session s = sessionRepository.findById(sid).orElse(null);
        if (s == null) { // sid not known in db
            System.out.println("ERROR: provided session id is not known during authentication");
            return null;
        }
        return s;
    }

    public Cookie attemptLogin(User user, String password) {
        String hashedPassword = DigestUtils.sha256Hex(password + user.getSalt());
        if (user.getPassword() == hashedPassword) { // successfull attempt

        }
        return null;
    }

    Cookie generateSession(User u) {
        // create session cookie
        String sid = generateSalt(32);
        Cookie cookie = new Cookie("sid", sid);
        cookie.setAttribute("SameSite", "Strict");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        // generate session
        Session s = new Session();
        s.setSid(sid);
        s.setUser(u);
        sessionRepository.save(s);
        return cookie;
    }

    /*
     * generates a random string
     * 
     * @value: length
     * 
     * @return: salt
     */
    String generateSalt(int length) {
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
