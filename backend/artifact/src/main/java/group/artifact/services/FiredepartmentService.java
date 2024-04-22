package group.artifact.services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.MessageDTO;
import group.artifact.models.Firedepartment;
import group.artifact.repositories.FiredepartmentRepository;

@Service
public class FiredepartmentService {

    @Autowired
    FiredepartmentRepository firedepartmentRepository;

    public Firedepartment receiveById(Integer fid) { // firedepartment id
        return firedepartmentRepository.findById(fid).orElse(null);
    }

    public List<MessageDTO> receiveAllByAttribute(String attr) {
        if (attr.equals("name")) {
            List<String> names = firedepartmentRepository.findAllNames();
            return names.stream().map(name -> new MessageDTO(name)).collect(Collectors.toCollection(LinkedList::new));
        } else {
            System.out.println("ERROR: type unknown in query string when searching for firedepartments");
            return null;
        }
    }

    public void save(Firedepartment fd) {
        firedepartmentRepository.save(fd);
    }
}
