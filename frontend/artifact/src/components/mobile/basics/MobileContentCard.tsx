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
  const navigate = useNavigate();

  const handeClick = () => {
    navigate(path);
  };

  // Determine the background image
  let backgroundImg;
  let optionX;
  let optionFilter = "brightness(.4)";
  switch (img) {
    case "vehicle":
      backgroundImg = vehicle;
      optionX = "center";
      optionFilter = "";
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
    default: // template
      backgroundImg = questionmarkPlaceholder;
  }

  return (
    <section
      className="content-card-section flex flex-col justify-center items-center my-2 z-10 h-[40vh] md:w-[80vw] lg:w-[45vw] lg:h-[40vh] 2xl:w-[30vw] 2xl:h-[40vh]"
      onClick={handeClick}
    >
      <div
        id="content-card-background-image"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPositionX: optionX,
          filter: optionFilter,
        }}
        className="rounded-xl"
      ></div>
      <h1 className="break-all">{title}</h1>
      <h2>{subtitle}</h2>
    </section>
  );
}
