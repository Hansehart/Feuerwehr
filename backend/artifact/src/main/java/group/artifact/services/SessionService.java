package group.artifact.services;

import java.security.SecureRandom;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.models.User;
import group.artifact.repositories.SessionRepository;
import group.artifact.repositories.UsersInFiredepartmentRepository;
import jakarta.servlet.http.Cookie;

@Service
public class SessionService {
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    UsersInFiredepartmentRepository usersInFiredepartmentRepository;

    private final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public Session auth(String sid) {
        Session s = sessionRepository.findById(sid).orElse(null);
        if (s == null) { // sid not known in db
            System.out.println("ERROR: provided session id is not known during authentication");
            return null;
        }
        return s;
    }

    public Cookie removeSession(String sid) {
        Session s = sessionRepository.findById(sid).orElse(null);
        if (s != null) { // session still exists
            sessionRepository.delete(s);
        }
        return generateCookie("sid", null, 0); // 0 deletes the cookie form the store
    }

    public Cookie attemptLogin(User user, String password) {
        String hashedPassword = DigestUtils.sha256Hex(password + user.getSalt());
        if (user.getPassword().equals(hashedPassword)) { // successfull attempt
            Firedepartment f = usersInFiredepartmentRepository.findByUser(user).stream()
                    .filter(membership -> membership.isMain())
                    .findFirst()
                    .map(m -> m.getFiredepartment())
                    .orElse(null);
            String sid = generateSalt(32);
            Cookie sessionCookie = generateCookie("sid", sid, 604800);

            Session s = new Session(sid, user, f);
            sessionRepository.save(s);
            return sessionCookie; 
        }
        return null;
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

    Cookie generateSession(User u) {
        // create session cookie
        String sid = generateSalt(32);
        Cookie cookie = generateCookie("sid", sid, 604800); // a week

        // generate session
        Session s = new Session();
        s.setSid(sid);
        s.setUser(u);
        sessionRepository.save(s);
        return cookie;
    }

    private Cookie generateCookie(String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setAttribute("SameSite", "Strict");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        return cookie;
    }
}
