import { useNavigate } from "react-router-dom";
import RoundedIcon from "../../general/RoundedIcon";
import "./MobileContentCardStyle.css";

import highwayAccident from "/src/assets/pictures/highway-accident.jpg";
import firedepartmentEmergency from "/src/assets/pictures/firedepartment-emergency.jpg";
import questionmarkPlaceholder from "/src/assets/pictures/questionmark-placeholder.jpg";


interface MobileContentCardProps {
  title: string;
  subtitle: string;
  path: string;
  img: string;
}

export default function MobileContentCard({
  title,
  subtitle,
  path,
  img
}: MobileContentCardProps) {
  const navigate = useNavigate();

  const handeClick = () => {
    navigate(path);
  };

  // Determine the background image 
  let backgroundImg;
  switch (img) {
    case "highwayAccident":
      backgroundImg = highwayAccident;
      break;
    case "firedepartmentEmergency":
      backgroundImg = firedepartmentEmergency;
      break;
    default: // tewmplate
      backgroundImg = questionmarkPlaceholder;
  }

  return (
    <section className="content-card-section" onClick={handeClick}>
      <div
        id="content-card-background-image"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <RoundedIcon icon="vehicle-r" bgColor="#000000d6" stroke="#ea4138" />
    </section>
  );
}
