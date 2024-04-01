import React from "react";
import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  before?: React.ReactNode;
  numberOfCards: number;
  after?: React.ReactNode;
}

export default function MobileBody({
  before,
  numberOfCards,
  after,
}: MobileBodyProps) {
  const cards = Array.from({ length: numberOfCards }, (_, index) => (
    <MobileContentCard
      key={index}
      title="LF10"
      text="Lösch&shy;gruppen&shy;fahrzeug"
      path="/vehicle"
    />
  ));

  return (
    <main style={{ marginBottom: "25vh" }}>
      {before}
      {cards}
      {after}
    </main>
  );
}
