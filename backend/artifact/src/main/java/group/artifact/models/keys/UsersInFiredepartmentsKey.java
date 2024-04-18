package group.artifact.models.keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UsersInFiredepartmentsKey implements Serializable {
    @Column(name = "fk_users")
    private Integer fkUsers;

    @Column(name = "fk_firedepartment")
    private Integer fkFiredepartment;

    @Override
    public int hashCode() {
        return (int) (fkUsers.hashCode() * fkFiredepartment.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UsersInFiredepartmentsKey)) {
            return false;
        }
        UsersInFiredepartmentsKey other = (UsersInFiredepartmentsKey) o;
        boolean equalsForeignKeys = (fkUsers == null && other.fkUsers == null) || (fkUsers != null && this.fkUsers.equals(other.fkUsers))
         || (fkFiredepartment == null && other.fkFiredepartment == null) || (fkFiredepartment != null && this.fkFiredepartment.equals(other.fkFiredepartment));
        return equalsForeignKeys;
    }
}
