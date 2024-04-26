import Table from "../Table";
import "./MobileVehicleViewStyle.css";
import fireEngine from "/src/assets/fire-engine.png";

interface MobileVehicleView {
  title: string;
}

const convertSoftHyphen = (title: string) => {
  return title.replace(/&shy;/g, "\u00AD");
};

export default function MobileVehicleView({ title }: MobileVehicleView) {
  return (
    <div className="vehicle-view">
      <section className="vehicle">
        <h2>{convertSoftHyphen(title)}</h2>
        <img src={fireEngine} alt="fire engine"></img>
        <h3>Material</h3>
      </section>
      <section className="material">
        <Table header={["Gerät", "Stk"]} data={["Axt", "2"]}/>
      </section>
    </div>
  );
}
