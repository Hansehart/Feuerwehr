import "./MobileStartPreviewStyle.css";
import extingusihBurningVehicle from "/src/assets/videos/extingusih-burning-vehicle.mov";

export default function MobileStartPreview() {
  return (
    <section>
      <video>
        <source src={extingusihBurningVehicle}/>
      </video>
    </section>
  );
}
