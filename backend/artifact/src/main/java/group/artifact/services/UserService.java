package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.dtos.ProfileDTO;
import group.artifact.models.User;
import group.artifact.repositories.UserRepository;
import jakarta.servlet.http.Cookie;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

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
     * @return: salt
     */
    private String generateSalt(Integer length) {
        String randomString = UUID.randomUUID().toString();
        String salt = DigestUtils.sha256Hex(randomString);
        if (length > salt.length()) {
            throw new IndexOutOfBoundsException();
        }
        return salt.substring(0, length);
    }
}
