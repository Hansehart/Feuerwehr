import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileVehicleView from "../../components/mobile/MobileVehicleView";

interface Vehicle {
  name: string;
  shortcut: string;
  crew: string;
  hp: number;
  waterCapacity: number;
}

interface StorageWithMaterial {
  stid: number; // storage id
  stname: string; // storage name
  name: string; // material name
  quantity: number;
  description: string;
}


function Vehicle() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [detailsData, setDetailsData] = useState<string[][]>();
  const [materialData, setMaterialData] = useState<string[][]>();
  const { rvt, rvn } = useParams();

  useEffect(() => {
    fetch(
      `https://feuerwehr.hansehart.de/api/service/receive/vehicle?rvt=${rvt}&rvn=${rvn}`
    )
      .then((response) => response.json())
      .then((data: Vehicle) => {
        setVehicle(data);
        const formattedData: string[][] = [];

        if (data.crew) {
          formattedData.push(["Besatzung", data.crew]);
        }
        if (data.hp) {
          formattedData.push(["PS", String(data.hp)]);
        }
        if (data.waterCapacity) {
          formattedData.push(["Löschwasser", String(data.waterCapacity) + "L"]);
        }
      
        setDetailsData(formattedData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
    fetch(
      `https://feuerwehr.hansehart.de/api/service/receive/vehicle/storages?rvt=${rvt}&rvn=${rvn}`
    )
      .then((response) => response.json())
      .then((data: StorageWithMaterial[]) => {
        const formattedData: string[][] = data.map((d) => [
          d.name,
          d.stname, // storage name
          String(d.quantity),
        ]);
        setMaterialData(formattedData);
      })
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
      <MobileHeader name="Fahrzeuge" />
      <MobileBody
        main={
          <MobileVehicleView
            title={vehicle?.name || "lädt..."}
            material={materialData ?? []}
            details={detailsData ?? []}
          />
        }
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="department" />
    </div>
  );
}

export default Vehicle;
