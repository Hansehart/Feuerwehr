import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  stid: number;
  stname: string;
  name: string;
  quantity: number;
  description: string;
}

function Vehicle() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [detailsData, setDetailsData] = useState<string[][]>([]);
  const [materialData, setMaterialData] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const rvt = searchParams.get('rvt');
  const rvn = searchParams.get('rvn');

  const { changeView } = useNavbar();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://feuerwehr.hansehart.de/api/service/receive/vehicle?rvt=${rvt}&rvn=${rvn}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }

        const data: Vehicle = await response.json();
        setVehicle(data);

        const formattedData: string[][] = [
          ...(data.crew ? [["Besatzung", data.crew]] : []),
          ...(data.hp ? [["PS", String(data.hp)]] : []),
          ...(data.waterCapacity ? [["Löschwasser", `${data.waterCapacity}L`]] : []),
        ];

        setDetailsData(formattedData);

        const storageResponse = await fetch(
          `https://feuerwehr.hansehart.de/api/service/receive/vehicle/storages?rvt=${rvt}&rvn=${rvn}`
        );

        if (!storageResponse.ok) {
          throw new Error('Failed to fetch storage data');
        }

        const storageData: StorageWithMaterial[] = await storageResponse.json();
        const formattedStorageData: string[][] = storageData.map((d) => [
          d.name,
          d.stname,
          String(d.quantity),
        ]);

        setMaterialData(formattedStorageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, [rvt, rvn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MobileHeader name="Fahrzeuge" link="/home"/>
      <MobileBody
        main={
          <MobileVehicleView
            title={vehicle?.name || "Unbekanntes Fahrzeug"}
            material={materialData.length > 0 ? materialData : []}
            details={detailsData.length > 0 ? detailsData : []}
          />
        }
      />
      <MobileNavBar changeView={changeView} preset="department" />
      <MobileInfoFooter />
    </div>
  );
}

export default Vehicle;