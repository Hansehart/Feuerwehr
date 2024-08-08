import { useNavigate } from "react-router-dom";
import RoundedIcon from "../../general/RoundedIcon";
import "./MobileContentCardStyle.css";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";
//import firedpartmentEmergency from "/src/assets/pictures/firedepartment-emergency.jpg";

interface MobileContentCardProps {
  title: string;
  subtitle: string;
  path: string;
}

export default function MobileContentCard({
  title,
  subtitle,
  path,
}: MobileContentCardProps) {
  const navigate = useNavigate();

  const handeClick = () => {
    navigate(path);
  };

  return (
    <section className="content-card-section" onClick={handeClick}>
      <div id="content-card-background-image" style={{ backgroundImage: `url(${highwayAccident})` }}></div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <RoundedIcon icon="vehicle-r" bgColor="#000000d6" stroke="#ea4138" />
    </section>
  );
}
