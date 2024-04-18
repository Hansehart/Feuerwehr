package group.artifact.models;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class Session {
    private String sid;
    
    @ManyToOne
    @JoinColumn(name = "fk_user")
    private User user;
}
