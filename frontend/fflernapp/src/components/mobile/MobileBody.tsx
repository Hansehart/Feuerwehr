import React, { useEffect, useState } from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode;
  type: string;
  after?: React.ReactNode;
}

interface ContentData {
  title: string;
  subtitle: string;
  path: string;
  content: string;
}

export default function MobileBody({
  before,
  type,
  after,
}: MobileBodyProps) {

  const [contentData, setContentData] = useState<ContentData[]>([]);

  useEffect(() => {
    fetch(`https://fflernapp.hansehart.de/api/service/receive/contentpages?type=${type}`)
      .then((response) => response.json())
      .then((data) => setContentData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [type]);

  const cards = contentData.map((data, index) => (
    <MobileContentCard
      key={index}
      title={data.title}
      subtitle={data.subtitle}
      path={data.path}
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
