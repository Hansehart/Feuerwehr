import { useNavigate } from "react-router-dom";
import "./MobileContentCardStyle.css";

import vehicle from "/src/assets/pictures/vehicle.jpg";
import serviceCenter from "/src/assets/pictures/service-center.jpg";
import emergencyExit from "/src/assets/pictures/emergency-exit.jpg";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";
import exercisePortrait from "/src/assets/pictures/exercise-portrait.jpg";
import mechanicPortrait from "/src/assets/pictures/mechanic-portrait.jpg";
import serviceRegulation from "/src/assets/pictures/service-regulation.jpg";
import firefighterTeaching from "/src/assets/pictures/firefighter-teaching.jpg";
import questionmarkPlaceholder from "/src/assets/pictures/questionmark-placeholder.jpg";
import { useState } from "react";

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
  img,
}: MobileContentCardProps) {
  const [option, setOption] = useState("");
  const navigate = useNavigate();

  const handeClick = () => {
    navigate(path);
  };

  // Determine the background image
  let backgroundImg;
  switch (img) {
    case "vehicle":
      backgroundImg = vehicle;
      setOption("center");
      break;
    case "serviceCenter":
      backgroundImg = serviceCenter;
      break;
    case "emergencyExit":
      backgroundImg = emergencyExit;
      break;
    case "highwayAccident":
      backgroundImg = highwayAccident;
      break;
    case "mechanicPortrait":
      backgroundImg = mechanicPortrait;
      break;
    case "exercisePortrait":
      backgroundImg = exercisePortrait;
      break;
    case "serviceRegulation":
      backgroundImg = serviceRegulation;
      break;
    case "firefighterTeaching":
      backgroundImg = firefighterTeaching;
      break;
    default: // tewmplate
      backgroundImg = questionmarkPlaceholder;
  }

  return (
    <section className="content-card-section" onClick={handeClick}>
      <div
        id="content-card-background-image"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundPositionX: option }}
      ></div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </section>
  );
}
