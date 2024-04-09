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

  const breakWords = ['lösch', 'gruppen', 'fahrzeug']; // array of words which causes a break

  /*
  * Provides soft hypen for long words.
  * i.e title = löschgruppenfahrzeug, breakWords = [lösch, gruppen, fahrzeug]
  * then it returns lösch&shy;gruppen&shy;fahrzeug
  */
  const addSoftHyphen = (title: string) => {
    let modifiedTitle = title.toLowerCase();
    breakWords.forEach(word => {
      if (modifiedTitle.includes(word)) {
        const splitTitle = modifiedTitle.split(word);
        modifiedTitle = splitTitle.join(word + '&shy;');
      }
    });
    modifiedTitle = modifiedTitle[0].toUpperCase()  + modifiedTitle.slice(1); // capitalize first letter
    return modifiedTitle;
  };


  const cards = contentData.map((data, index) => (
    <MobileContentCard
      key={index}
      title={addSoftHyphen(data.title)}
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
