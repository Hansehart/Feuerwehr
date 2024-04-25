package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Session;
import group.artifact.repositories.SessionRepository;

@Service
public class SessionService {
    @Autowired
    SessionRepository sessionRepository;

    public Session auth(String sid) {
        Session s = sessionRepository.findById(sid).orElse(null);
        if (s == null) { // sid not known in db
            System.out.println("ERROR: provided session id is not known during authentication");
            return null;
        }
        return s;
    }
}
