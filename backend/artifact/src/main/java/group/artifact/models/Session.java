package group.artifact.models;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Session {
    private String sid;
    
    @ManyToOne
    @JoinColumn(name = "fk_user")
    private User user;
}
