import React, { useEffect, useState } from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode;
  type: string;
  after?: React.ReactNode;
  marginToFooter?: string;
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
  marginToFooter
}: MobileBodyProps) {

  const [contentData, setContentData] = useState<ContentData[]>([]);

  useEffect(() => {
    // clear old cards from another tab
    setContentData([]);
    fetch(`https://fflernapp.hansehart.de/api/service/receive/contentpages?type=${type}`)
      .then((response) => response.json())
      .then((data) => setContentData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [type]);

  const convertSoftHyphen = (title: string) => {
    return title.replace(/&shy;/g, "\u00AD");
  };

  const cards = contentData.map((data, index) => (
    <MobileContentCard
      key={index}
      title={convertSoftHyphen(data.title)}
      subtitle={convertSoftHyphen(data.subtitle)}
      path={data.path}
    />
  ))

  return (
    <main style={{marginBottom: marginToFooter}}>
      {before}
      {cards}
      {after}
    </main>
  );
}
