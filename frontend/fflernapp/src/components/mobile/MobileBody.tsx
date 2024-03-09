import MobileContentCard from "./MobileContentCard";

interface MobileBodyProps {
  numberOfCards: number;
}

export default function MobileBody({ numberOfCards }: MobileBodyProps) {
  const cards = Array.from({ length: numberOfCards }, (_, index) => (
    <MobileContentCard
      key={index}
      title="LF10"
      text="Lösch&shy;gruppen&shy;fahrzeug"
      path="/vehicle"
    />
  ));

  return <main style={{ marginBottom: "25vh" }}>{cards}</main>;
}
