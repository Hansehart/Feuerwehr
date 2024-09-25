package group.artifact.models.keys;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserAndQuestionKey implements Serializable{
    @Column(name = "fk_user")
    private Integer fkUser;

    @Column(name = "fk_question")
    private Integer fkQuestion;

    @Override
    public int hashCode() {
        return (int) (fkUser.hashCode() * fkQuestion.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAndQuestionKey)) {
            return false;
        }
        UserAndQuestionKey other = (UserAndQuestionKey) o;
        boolean equalsForeignKeys = (fkUser == null && other.fkUser == null) || (fkUser != null && this.fkUser.equals(other.fkUser))
         || (fkQuestion == null && other.fkQuestion == null) || (fkQuestion != null && this.fkQuestion.equals(other.fkQuestion));
        return equalsForeignKeys;
    }
}
