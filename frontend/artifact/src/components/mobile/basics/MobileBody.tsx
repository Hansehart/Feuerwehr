import React, { useEffect, useState, useCallback } from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode;
  type?: string;
  main?: React.ReactNode;
  after?: React.ReactNode;
  fullscreen?: React.ReactNode;
}

interface Preview {
  title: string;
  subtitle: string;
  alignment: string;
  path: string;
  img: string;
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
  fullscreen,
}: MobileBodyProps) {
  const [preview, setPreview] = useState<Preview[]>([]);

  const fetchData = useCallback(() => {
    setPreview([]); // Clear old cards

    if (!type) return;

    let url = "";
    let dataProcessor = (data: any) => data;

    if (type === "/vehicle") {
      url = `https://feuerwehr.hansehart.de/api/service/receive/vehicles`;
      dataProcessor = (data: Vehicle[]) =>
        data.map((item) => ({
          title: item.shortcut,
          subtitle: item.name,
          alignment: "items-start pl-4",
          path: `/main/vehicle?rvt=${item.radioVehicleType}&rvn=${item.radioVehicleNumber}`,
          img: "vehicle",
        }));
    } else if (type === "/learn/exercises") {
      url =
        "https://feuerwehr.hansehart.de/api/service/receive/quiz-categories";
      dataProcessor = (data: { content: string[] }) => {
        const categoryCards = data.content.map((category) => ({
          title: category,
          subtitle: "",
          alignment: "items-center",
          path: `/learn/exercises/train?category=${category.toLowerCase()}`,
          img: "",
        }));

        // all categories mixed
        categoryCards.unshift({
          title: "Shuffle",
          subtitle: "Kategorien gemischt",
          alignment: "items-center",
          path: "/learn/exercises/train?category=any",
          img: "",
        });

        return categoryCards;
      };
    } else {
      url = `https://feuerwehr.hansehart.de/api/service/receive/previews?type=${type}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const processedData = dataProcessor(data);
        setPreview(processedData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const convertSoftHyphen = (title: string) => {
    return title.replace(/&shy;/g, "\u00AD");
  };

  const cards = preview.map((data, index) => (
    <MobileContentCard
      key={index}
      title={convertSoftHyphen(data.title)}
      subtitle={convertSoftHyphen(data.subtitle)}
      alignment={data.alignment}
      path={data.path}
      img={data.img}
    />
  ));

  return (
    <main className="flex flex-col items-center">
      {fullscreen ? (
        fullscreen
      ) : (
        <>
          {before}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-center min-h-[60vh] min-w-[90vw] bg-gray-100 rounded-xl p-4 m-8 md:min-w-[40vw]">
            {cards.length > 0 ? cards : main}
          </div>
          {after}
        </>
      )}
    </main>
  );
}
