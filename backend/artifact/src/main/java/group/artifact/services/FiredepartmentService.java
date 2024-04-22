package group.artifact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Firedepartment;
import group.artifact.repositories.FiredepartmentRepository;

@Service
public class FiredepartmentService {

    @Autowired
    FiredepartmentRepository firedepartmentRepository;

    public Firedepartment receiveById(Integer fid) { // firedepartment id
        return firedepartmentRepository.findById(fid).orElse(null);
    }

    public List<Firedepartment> receiveAll() {
        return firedepartmentRepository.findAllOrderedByName();
    }

    public void save(Firedepartment fd) {
        firedepartmentRepository.save(fd);
    }
}
