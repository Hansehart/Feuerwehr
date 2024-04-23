package group.artifact.models.keys;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

@Embeddable
public class UsersInFiredepartmentsKey implements Serializable {
    @JoinColumn(name = "fk_users")
    private Integer fkUsers;

    @JoinColumn(name = "fk_firedepartment")
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
