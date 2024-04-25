import React, { useEffect, useState } from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode; // header (in main)
  type?: string; // main is made with contentcards
  main?: React.ReactNode; // main is custom made
  after?: React.ReactNode; // footer (in main)
  marginToFooter?: string;
}

interface Preview {
  title: string;
  subtitle: string;
  path: string;
}

interface Vehicle {
  fid: number;
  name: string;
  shortcut: string;
  radioVehicleType: string;
  radioVehicleNumber: string;
}

export default function MobileBody({
  before,
  type,
  main,
  after,
  marginToFooter,
}: MobileBodyProps) {
  const [preview, setPreview] = useState<Preview[]>([]);

  useEffect(() => {
    // clear old cards from another tab
    setPreview([]);
    if (type) {
      if (type === "vehicle") {
        fetch(`https://fflernapp.hansehart.de/api/service/receive/vehicles`)
          .then((response) => response.json())
          .then((data) => {
            // map and extract shortcut and name fields
            const previews = data.map((item: Vehicle) => ({
              title: item.shortcut,
              subtitle: item.name,
              path: `/vehicles&rvt=${item.radioVehicleType}&rvn=${item.radioVehicleNumber}`,
            }));
            setPreview((prevPreview) => [...prevPreview, ...previews]);
          });
      }
      else {
        fetch(
          `https://fflernapp.hansehart.de/api/service/receive/contentpages?type=${type}`
        )
          .then((response) => response.json())
          .then((data) => setPreview(data))
          .catch((error) => console.error("Error fetching data: ", error));
      }
      
    }
  }, [type]);

  const convertSoftHyphen = (title: string) => {
    return title.replace(/&shy;/g, "\u00AD");
  };

  const cards = preview.map((data, index) => (
    <MobileContentCard
      key={index}
      title={convertSoftHyphen(data.title)}
      subtitle={convertSoftHyphen(data.subtitle)}
      path={data.path}
    />
  ));

  return (
    <main style={{ marginBottom: marginToFooter }}>
      {before}
      {cards.length > 0 ? cards : main}
      {after}
    </main>
  );
}
