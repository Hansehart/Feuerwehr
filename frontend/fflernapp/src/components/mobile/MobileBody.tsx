import React, { useEffect, useState } from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

interface ContentData {
  title: string;
  subtitle: string;
  content: string;
}

export default function MobileBody({
  before,
  after,
}: MobileBodyProps) {

  const [contentData, setContentData] = useState<ContentData[]>([]);

  useEffect(() => {
    fetch("https://fflernapp.hansehart.de/api/service/receive/contentpages")
      .then((response) => response.json())
      .then((data) => setContentData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const cards = contentData.map((data, index) => (
    <MobileContentCard
      key={index}
      title={data.title}
      subtitle={data.subtitle}
      path="/learn"
    />
  ))

  return (
    <main style={{ marginBottom: "25vh" }}>
      {before}
      {cards}
      {after}
    </main>
  );
}
