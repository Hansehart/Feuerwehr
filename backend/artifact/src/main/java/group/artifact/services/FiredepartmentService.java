package group.artifact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.MessageDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.SessionRepository;

@Service
public class FiredepartmentService {
    @Autowired
    FiredepartmentRepository firedepartmentRepository;
    @Autowired
    SessionRepository sessionRepository;

    public Firedepartment receiveById(Integer fid) { // firedepartment id
        Firedepartment f = firedepartmentRepository.findById(fid).orElse(null);
        return f;
    }   

    public MessageDTO receiveAttribute(String sid, String attr) {
        MessageDTO m = new MessageDTO(); // message
        if (attr.equals("name")) {
            Session s = sessionRepository.findById(sid).orElse(null);
            if (s == null) {
                System.out.println("ERROR: corresponding firedepartment for sid not found whereby firedepartment can't provide further information");
                m.setMsg(null);
            }
            Firedepartment f = s.getFiredepartment();
            m.setMsg(f.getName());
        }
        return m;
    }   

    public List<Firedepartment> receiveAll() {
        return firedepartmentRepository.findAllOrderedByLocationNumber();
    }

    public void save(Firedepartment fd) {
        firedepartmentRepository.save(fd);
    }
}
