package group.artifact.models.mappers;

import group.artifact.models.Question;
import group.artifact.models.User;
import group.artifact.models.keys.UsersAndQuestionsKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users_and_questions")
public class UsersAndQuestions {
    @EmbeddedId
    UsersAndQuestionsKey id = new UsersAndQuestionsKey();

    @ManyToOne
    @MapsId("fkUser")
    @JoinColumn(name = "fk_user", insertable = false, updatable = false)
    User user;

    @ManyToOne
    @MapsId("fkQuestion")
    @JoinColumn(name = "fk_question", insertable = false, updatable = false)
    Question question;
}
