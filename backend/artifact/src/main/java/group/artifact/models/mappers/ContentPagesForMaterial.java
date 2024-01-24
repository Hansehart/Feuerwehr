package group.artifact.models.mappers;

import group.artifact.models.Contentpage;
import group.artifact.models.Material;
import group.artifact.models.keys.ContentPagesForMaterialKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "contentpages_for_materials")
public class ContentPagesForMaterial {
    @EmbeddedId
    ContentPagesForMaterialKey id = new ContentPagesForMaterialKey();

    @ManyToOne
    @JoinColumn(name = "fk_contentpage", insertable = false, updatable = false)
    Contentpage contentpage;

    @ManyToOne
    @JoinColumn(name = "fk_material", insertable = false, updatable = false)
    Material material;
}
