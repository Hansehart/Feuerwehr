package group.artifact.models;

import java.util.Set;

import group.artifact.models.mappers.ImagesForVehicles;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "vehicle")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "fk_radio_call_sign")
    private RadioCallSign radioCallSign;

    private Short radioVehicleType;
    private Short radioVehicleNumber;
    private String name;
    private String type;

    @OneToMany(mappedBy = "vehicle")
    Set<ImagesForVehicles> imagesForVehicles;
}
