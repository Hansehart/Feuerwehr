package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.dtos.MessageDTO;
import group.artifact.dtos.ProfileDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.models.User;
import group.artifact.models.mappers.UsersInFiredepartments;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.SessionRepository;
import group.artifact.repositories.UserRepository;
import group.artifact.repositories.UsersInFiredepartmentRepository;
import jakarta.servlet.http.Cookie;

@Service
public class UserService {
    @Autowired
    SessionService sessionService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    FiredepartmentRepository firedepartmentRepository;
    @Autowired
    UsersInFiredepartmentRepository usersInFiredepartmentRepository;

    private final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?=";

    public MessageDTO<Boolean> authUser(String sid) {
        Session s = sessionService.auth(sid);
        MessageDTO<Boolean> msg = new MessageDTO<>();
        if (s != null) {
            msg.setMsg(true);
            return msg;
        }
        msg.setMsg(false);
        return msg;

    }

    public MessageDTO<String> receiveUserAttr(String sid, String attr) {
        Session s = sessionService.auth(sid);
        User u = s.getUser();
        MessageDTO<String> msg = new MessageDTO<>();
        if (attr.equals("name")) {
            msg.setMsg(u.getName());
        }
        return msg;
    }

    public Cookie saveAccount(User u) {
        // update user
        String salt = generateSalt(16);
        String hashedPW = DigestUtils.sha256Hex(u.getPassword() + salt);
        u.setPassword(hashedPW);
        u.setSalt(salt);

        // generate session cookie
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

        // save entities
        userRepository.save(u);
        sessionRepository.save(s);

        return cookie;
    }

    public void saveProfile(String sid, ProfileDTO p) { // profile
        // update user
        Session session = sessionService.auth(sid);
        User u = session.getUser();
        u.setName(p.getUsername());

        // convert profileDTO fid to firedepartment
        Firedepartment f = firedepartmentRepository.findById(p.getFid()).orElse(null);
        if (f == null) {
            System.out.println("ERROR: firedepartment was not found and could not be corresponded to a membership with a user");
            throw new IllegalArgumentException();
        }

        // create membership
        UsersInFiredepartments membership = new UsersInFiredepartments();
        membership.setUser(u);
        membership.setFiredepartment(f);

        // update session
        Session s = sessionRepository.findById(sid).orElse(null);
        if (s == null) {
            System.out.println("ERROR: session was not found and could not be corresponded to a firedepartment");
            throw new IllegalArgumentException();
        }
        s.setFiredepartment(f);

        // save entities
        usersInFiredepartmentRepository.save(membership);
        userRepository.save(u);
        sessionRepository.save(s);
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
