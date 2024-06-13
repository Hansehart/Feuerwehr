import Table from "../general/Table";
import "./MobileVehicleViewStyle.css";
import fireEngine from "/src/assets/fire-engine.png";

interface MobileVehicleView {
  title: string;
  data: string[][];
}

const convertSoftHyphen = (title: string) => {
  return title.replace(/&shy;/g, "\u00AD");
};

export default function MobileVehicleView({ title, data }: MobileVehicleView) {
  return (
    <div className="vehicle-view">
      <section className="vehicle">
        <h2>{convertSoftHyphen(title)}</h2>
        <img src={fireEngine} alt="fire engine"></img>
      </section>
      <section className="material">
        <h3>Material</h3>
        <Table header={["Gerät", "Ort", "Stk."]} data={data} />
      </section>
      <section className="specification">
        <h3>Technische Daten</h3>
        <Table header={["Spezifikation", "Wert"]} data={[]} />
      </section>
    </div>
  );
}
