import "./MobileStartPreviewStyle.css";
import extingusihBurningVehicle from "/src/assets/videos/extinguish-burning-vehicle.mp4";

export default function MobileStartPreview() {
  return (
    <section>
      <video controls>
        <source src={extingusihBurningVehicle} type="video/mp4"/>
      </video>
    </section>
  );
}
