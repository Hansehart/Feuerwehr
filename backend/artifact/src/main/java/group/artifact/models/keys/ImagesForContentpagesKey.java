package group.artifact.models.keys;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForContentpagesKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImageC;

    @Column(name = "fk_contentpage")
    private Integer fkContentpageI;

    @Override
    public int hashCode() {
        return (int) (fkImageC.hashCode() * fkContentpageI.hashCode());
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
         || (fkContentpageI == null && other.fkContentpageI == null) || (fkContentpageI != null && this.fkContentpageI.equals(other.fkContentpageI));
        return equalsForeignKeys;
    }
}
