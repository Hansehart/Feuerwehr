import "./MobileStartPreviewStyle.css";
import extingusihBurningVehicle from "/src/assets/videos/extinguish-burning-vehicle.mp4";

export default function MobileStartPreview() {
  return (
    <section>
      <video>
        <source src={extingusihBurningVehicle}/>
      </video>
    </section>
  );
}
