package group.artifact.models.keys;
import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForContentpagesKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImageC;

    @Column(name = "fk_contentpage")
    private Integer fkContentpage;

    @Override
    public int hashCode() {
        return (int) (fkImageC.hashCode() * fkContentpage.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImagesForContentpagesKey)) {
            return false;
        }
        ImagesForContentpagesKey other = (ImagesForContentpagesKey) o;
        boolean equalsForeignKeys = (fkImageC == null && other.fkImageC == null) || (fkImageC != null && this.fkImageC.equals(other.fkImageC))
         || (fkContentpage == null && other.fkContentpage == null) || (fkContentpage != null && this.fkContentpage.equals(other.fkContentpage));
        return equalsForeignKeys;
    }
}
