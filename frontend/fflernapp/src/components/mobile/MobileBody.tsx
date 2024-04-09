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
  * i.e title = Löschgruppenfahrzeug, breakWords = [lösch, gruppen, fahrzeug]
  * then it returns Lösch&shy;gruppen&shy;fahrzeug
  */
  const addSoftHyphen = (title: string) => {
    let modifiedTitle = title;
    breakWords.forEach(word => {
      const lowerCaseWord = word.toLowerCase();
      const index = modifiedTitle.toLowerCase().indexOf(lowerCaseWord);
      if (index !== -1) { // result found 
        // check if the first character of the word in the original title was capitalized
        if (title.charAt(index) === title.charAt(index).toUpperCase()) {
          word[0].toUpperCase();
        }
        modifiedTitle =
          modifiedTitle.substring(0, index) +
          word +
          "\u00AD" + // soft hyphen Unicode character
          modifiedTitle.substring(index + word.length);
      }
    });

    return modifiedTitle;
  };


  const cards = contentData.map((data, index) => (
    <MobileContentCard
      key={index}
      title={addSoftHyphen(data.title)}
      subtitle={addSoftHyphen(data.subtitle)}
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
