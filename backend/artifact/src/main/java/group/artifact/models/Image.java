package group.artifact.models;

import java.util.Set;

import group.artifact.models.mappers.ImagesForContentpages;
import group.artifact.models.mappers.ImagesForMaterials;
import group.artifact.models.mappers.ImagesForVehicles;
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
@Table(name="image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String path;
    private Short width;
    private Short height;

    @OneToMany(mappedBy = "image")
    Set<ImagesForVehicles> imagesForVehicles;

    @OneToMany(mappedBy = "image")
    Set<ImagesForContentpages> imagesForContentpages;

    @OneToMany(mappedBy = "image")
    Set<ImagesForMaterials> imagesForMaterials;
}
