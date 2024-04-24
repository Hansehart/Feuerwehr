package group.artifact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.MessageDTO;
import group.artifact.models.Firedepartment;
import group.artifact.repositories.FiredepartmentRepository;

@Service
public class FiredepartmentService {

    @Autowired
    FiredepartmentRepository firedepartmentRepository;
    @Autowired 
    UserService userService;

    public Firedepartment receiveById(Integer fid) { // firedepartment id
        Firedepartment f = firedepartmentRepository.findById(fid).orElse(null);
        return f;
    }   

    public MessageDTO receiveAttribute(String sid, String attr) {
        MessageDTO msg = userService.receiveUserAttr(sid, attr);
        return msg;
    }   

    public List<Firedepartment> receiveAll() {
        return firedepartmentRepository.findAllOrderedByLocationNumber();
    }

    public void save(Firedepartment fd) {
        firedepartmentRepository.save(fd);
    }
}
