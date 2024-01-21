package group.artifact.models;
import java.util.Set;

import group.artifact.models.mappers.ImagesForContentpages;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="contentpage")
public class Contentpage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;

    @OneToMany(mappedBy = "contentpageI")
    Set<ImagesForContentpages> imagesForContentpages;
}
