import RoundedIcon from "../RoundedIcon";
import "./MobileContentCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface MobileContentCardProps {
  title: string;
  text: string;
}

export default function MobileContentCard({
  title,
  text,
}: MobileContentCardProps) {
  return (
    <section
      className="content-card-section"
      style={{ backgroundImage: `url(${drivingFirefighters})` }}
    >
      <h1>{title}</h1>
      <h2>{text}</h2>
      <RoundedIcon icon="vehicle-r" bgColor="#000000d6" stroke="#ea4138" />
    </section>
  );
}
