package group.artifact.models.mappers;

import group.artifact.models.Contentpage;
import group.artifact.models.Image;
import group.artifact.models.keys.ImagesForContentpagesKey;
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
@Table(name="images_for_contentpages")
public class ImagesForContentpages {
    @EmbeddedId
    ImagesForContentpagesKey id = new ImagesForContentpagesKey();

    @ManyToOne
    @MapsId("fkImage")
    @JoinColumn(name = "fk_image")
    Image image;

    @ManyToOne
    @MapsId("fkContentpage")
    @JoinColumn(name = "fk_contentpage")
    Contentpage contentpage;
}
