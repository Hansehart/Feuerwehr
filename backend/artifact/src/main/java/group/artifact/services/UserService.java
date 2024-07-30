package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.dtos.ContainerDTO;
import group.artifact.dtos.ProfileDTO;
import group.artifact.dtos.UserDTO;
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

    public ContainerDTO<Boolean> authUser(String sid) {
        ContainerDTO<Boolean> msg = new ContainerDTO<>(false);
        if (sid == null) {
            return msg;
        }
        Session s = sessionService.auth(sid);
        if (s != null) {
            msg.setContent(true);
        }
        return msg;
    }

    public Cookie logout(String sid) {
        return sessionService.removeSession(sid);
    }

    public Cookie login(UserDTO u) {
        User user = userRepository.findByEmail(u.getEmail());
        if (user == null) { // no user found
            return null;
        }
        return sessionService.attemptLogin(user, u.getPassword());
    }

    public ContainerDTO<String> receiveUserAttr(String sid, String attr) {
        Session s = sessionService.auth(sid);
        if (s == null) { // no user for provided sid
            return null;
        }
        User u = s.getUser();
        ContainerDTO<String> msg = new ContainerDTO<>();
        if (attr.equals("name")) {
            msg.setContent(u.getName());
        } else if (attr.equals("email")) {
            msg.setContent(u.getEmail());
        }
        return msg;
    }

    public Cookie saveAccount(User u) {
        // initialize user
        User unique = userRepository.findByEmail(u.getEmail());
        if (unique != null) { // e-mail already taken
            return null;
        }
        String salt = sessionService.generateSalt(16);
        String hashedPW = DigestUtils.sha256Hex(u.getPassword() + salt);
        u.setPassword(hashedPW);
        u.setSalt(salt);

        // save user and generate session
        userRepository.save(u);
        Cookie sessionCookie = sessionService.generateSession(u);
        return sessionCookie;
    }

    public void saveProfile(String sid, ProfileDTO p) { // profile
        // update user
        Session session = sessionService.auth(sid);
        if (session == null) { // no user for provided sid
            return;
        }
        User u = session.getUser();
        u.setName(p.getUsername());

        // convert profileDTO fid to firedepartment
        Firedepartment f = firedepartmentRepository.findById(p.getFid()).orElse(null);
        if (f == null) {
            System.out.println(
                    "ERROR: firedepartment was not found and could not be corresponded to a membership with a user");
            throw new IllegalArgumentException();
        }

        // create membership
        UsersInFiredepartments membership = new UsersInFiredepartments();
        membership.setUser(u);
        membership.setFiredepartment(f);
        membership.setMain(true);

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

    public void updateUser(String sid, String attr, String value) {
        Session session = sessionService.auth(sid);
        if (session == null) { // no user for provided sid
            return;
        }

        User u = session.getUser();
        switch (attr) {
            case "username":
                u.setName(value);
                userRepository.save(u);
                break;
            case "password":
                String salt = sessionService.generateSalt(16);
                String hashedPW = DigestUtils.sha256Hex(value + salt);
                u.setPassword(hashedPW);
                u.setSalt(salt);
                userRepository.save(u);
            default:
                break;
        }
    }
}
