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

  const handleClick = () => {
    navigate(path);
  };

  // determine the background image and option style
  const backgroundImg = (() => {
    switch (img) {
      case "vehicle":
        setOption("center");
        return vehicle;
      case "serviceCenter":
        return serviceCenter;
      case "emergencyExit":
        return emergencyExit;
      case "highwayAccident":
        return highwayAccident;
      case "mechanicPortrait":
        return mechanicPortrait;
      case "exercisePortrait":
        return exercisePortrait;
      case "serviceRegulation":
        return serviceRegulation;
      case "firefighterTeaching":
        return firefighterTeaching;
      default: 
        return questionmarkPlaceholder;
    }
  })();

  return (
    <section className="content-card-section" onClick={handleClick}>
      <div
        id="content-card-background-image"
        className=""
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPositionX: option, // apply the option style here if set
        }}
      ></div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </section>
  );
}
