import "./MobileStartPreviewStyle.css";
import extingusihBurningVehicle from "/src/assets/videos/extinguish-burning-vehicle.webm";

export default function MobileStartPreview() {
  return (
    <section>
      <video controls>
        <source src={extingusihBurningVehicle} type="video/webm"/>
      </video>
    </section>
  );
}
