import RoundedIcon from "../RoundedIcon";
import "./MobileContentCardStyle.css";

interface MobileContentCardProps {
  title: string;
  text: string;
}

export default function MobileContentCard({
  title,
  text,
}: MobileContentCardProps) {
  return (
    <section className="content-card-section">
      <h1>{title}</h1>
      <h2>{text}</h2>
      <RoundedIcon icon="vehicle-r" bgColor="#000000d6" stroke="#ea4138" />
    </section>
  );
}
