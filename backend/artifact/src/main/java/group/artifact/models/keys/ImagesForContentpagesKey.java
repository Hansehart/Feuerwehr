package group.artifact.models.keys;
import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForContentpagesKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImage;

    @Column(name = "fk_contentpage")
    private Integer fkContentpage;

    @Override
    public int hashCode() {
        return (int) (fkImage.hashCode() * fkContentpage.hashCode());
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
        boolean equalsForeignKeys = (fkImage == null && other.fkImage == null) || (fkImage != null && this.fkImage.equals(other.fkImage))
         || (fkContentpage == null && other.fkContentpage == null) || (fkContentpage != null && this.fkContentpage.equals(other.fkContentpage));
        return equalsForeignKeys;
    }
}
