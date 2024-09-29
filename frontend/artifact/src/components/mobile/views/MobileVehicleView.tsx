import Table from "../../general/Table";
import "./MobileVehicleViewStyle.css";
import fireEngine from "/src/assets/pictures/fire-engine.png";

interface MobileVehicleView {
  title: string;
  material: string[][];
  details: string[][];
}

const convertSoftHyphen = (title: string) => {
  return title.replace(/&shy;/g, "\u00AD");
};

export default function MobileVehicleView({ title, material, details }: MobileVehicleView) {
  return (
    <div className="vehicle-view col-span-3">
      <section className="vehicle">
        <h2>{convertSoftHyphen(title)}</h2>
        <img src={fireEngine} alt="fire engine"></img>
      </section>
      <section className="material my-2">
        <h3>Material</h3>
        <Table header={["Gerät", "Ort", "Stk."]} data={material} />
      </section>
      <section className="specification my-2">
        <h3>Details</h3>
        <Table header={["Spezifikation", "Wert"]} data={details} />
      </section>
    </div>
  );
}
