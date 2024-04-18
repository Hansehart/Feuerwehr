package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Firedepartment;
import group.artifact.repositories.FiredepartmentRepository;

@Service
public class FiredepartmentService {

    @Autowired
    FiredepartmentRepository firedepartmentRepository;

    public Firedepartment receive(Integer fid) { // firedepartment id
        return firedepartmentRepository.findById(fid).orElse(null);
    }

    public void save(Firedepartment fd) {
        firedepartmentRepository.save(fd);
    }
}
