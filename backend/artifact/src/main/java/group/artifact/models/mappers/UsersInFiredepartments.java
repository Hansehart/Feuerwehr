package group.artifact.models.mappers;

import group.artifact.models.Firedepartment;
import group.artifact.models.User;
import group.artifact.models.keys.UsersInFiredepartmentsKey;
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
@Table(name="users_in_firedepartments")
public class UsersInFiredepartments {
    @EmbeddedId
    UsersInFiredepartmentsKey id = new UsersInFiredepartmentsKey();

    @ManyToOne
    @JoinColumn(name = "fk_user")
    User user;

    @ManyToOne
    @JoinColumn(name = "fk_firedepartment")
    Firedepartment firedepartment;
}
