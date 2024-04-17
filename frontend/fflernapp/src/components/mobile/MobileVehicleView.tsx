import "./MobileVehicleViewStyle.css";

interface MobileVehicleView {
  title: string;
}

export default function MobileVehicleView({ title }: MobileVehicleView) {
  return (
    <section className="vehicle-view">
      <h2>{title}</h2>
    </section>
  );
}
