package group.artifact.models.mappers;

import group.artifact.models.Question;
import group.artifact.models.User;
import group.artifact.models.keys.ImagesForVehiclesKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@NoArgsConstructor
@Table(name="user_and_question")
public class UserAndQuestion {
    @EmbeddedId
    ImagesForVehiclesKey id = new ImagesForVehiclesKey();

    @ManyToOne
    @JoinColumn(name = "fk_user", insertable = false, updatable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "fk_question", insertable = false, updatable = false)
    Question question;
}
