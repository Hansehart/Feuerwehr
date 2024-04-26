import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileVehicleView from "../../components/mobile/MobileVehicleView";

interface Vehicle {
  name: string;
  shortcut: string;
}

function Vehicle() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const { rvt, rvn } = useParams();

  useEffect(() => {
    fetch(
      `https://fflernapp.hansehart.de/api/service/receive/vehicle?rvt=${rvt}&rvn=${rvn}`
    )
      .then((response) => response.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    switch (select) {
      case "learn":
        navigate("/home", { state: { select: "learn" } });
        break;
      case "department":
        navigate("/home", { state: { select: "department" } });
        break;
      case "profile":
        navigate("/home", { state: { select: "profile" } });
        break;
    }
  }, [select]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  return (
    <div>
      <MobileHeader name={vehicle?.shortcut || "Fahrzeug"} />
      <MobileBody
        main={<MobileVehicleView title={vehicle?.name || "lädt..."} />}
        marginToFooter="18vh"
      />
      <MobileNavBar changeView={changeView} preset="department" />
    </div>
  );
}

export default Vehicle;
