package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;

import group.artifact.models.User;
import group.artifact.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void save(User u) {
        String hashedPW = DigestUtils.sha256Hex(u.getPassword());
        u.setPassword(hashedPW);
        u.setSalt(generateSalt());
        userRepository.save(u);
    }

    /*
     * generates a random string with a length of 10
     * 
     * @return: salt
     */
    private String generateSalt() {
        String randomString = UUID.randomUUID().toString();
        String salt = DigestUtils.sha256Hex(randomString);
        return salt.substring(0, 10);
    }
}
