package group.artifact.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @JoinColumn(name = "fk_firedepartment")
    private Firedepartment firedepartment;

    private String radioVehicleType;
    private String radioVehicleNumber;
    private String shortcut;
    private String name;

    // vehicle specification
    private String crew; // 0/1/8/9
    private Integer hp; // horse power
    private Integer waterCapacity;
}
