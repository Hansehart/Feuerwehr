import "./MobileVehicleViewStyle.css";
import fireEngine from "/src/assets/fire-engine.png";

interface MobileVehicleView {
  title: string;
}

export default function MobileVehicleView({ title }: MobileVehicleView) {
  return (
    <section className="vehicle-view">
      <h2>{title}</h2>
      <img src={fireEngine} alt="fire engine"></img>
      <h3></h3>
    </section>
  );
}
