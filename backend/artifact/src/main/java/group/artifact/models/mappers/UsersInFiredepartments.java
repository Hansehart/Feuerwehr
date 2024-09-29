package group.artifact.models.mappers;

import group.artifact.models.Firedepartment;
import group.artifact.models.User;
import group.artifact.models.keys.UsersInFiredepartmentsKey;
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
@Table(name="users_in_firedepartments")
public class UsersInFiredepartments {
    @EmbeddedId
    private UsersInFiredepartmentsKey id = new UsersInFiredepartmentsKey();

    @ManyToOne
    @MapsId("fkUser")
    @JoinColumn(name = "fk_user")
    private User user;

    @ManyToOne
    @MapsId("fkFiredepartment")
    @JoinColumn(name = "fk_firedepartment")
    private Firedepartment firedepartment;

    private boolean main;
}
