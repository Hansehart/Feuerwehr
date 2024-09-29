package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Message;
import group.artifact.repositories.MessageRepository;

@Service
public class ContactService {
    @Autowired
    MessageRepository messageRepository;

    public void save(Message msg) {
        messageRepository.save(msg);
    }
}
