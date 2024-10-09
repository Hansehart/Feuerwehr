import { useState, useEffect } from "react";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileVehicleView from "../../components/mobile/views/MobileVehicleView";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

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
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [detailsData, setDetailsData] = useState<string[][]>();
  const [materialData, setMaterialData] = useState<string[][]>();
  const searchParams = new URLSearchParams(window.location.search);
  const rvt = searchParams.get('type');
  const rvn = searchParams.get('number');

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

  const { changeView } = useNavbar();


  return (
    <div>
      <MobileHeader name="Fahrzeuge" link="/home"/>
      <MobileBody
        main={
          <MobileVehicleView
            title={vehicle?.name || "lädt..."}
            material={materialData ?? []}
            details={detailsData ?? []}
          />
        }
      />
      <MobileNavBar changeView={changeView} preset="department" />
      <MobileInfoFooter />
    </div>
  );
}

export default Vehicle;
