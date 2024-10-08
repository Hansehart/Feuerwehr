import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MaintenanceStyle.css";

import RoundedIcon from "./RoundedIcon";
import MobileButton from "../mobile/basics/MobileButton";

export default function Maintenance() {
  const initalTimer = 5;
  const [timer, setTimer] = useState(initalTimer);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const newPath = window.location.pathname
        .split("/")
        .slice(0, -1)
        .join("/");
      navigate(newPath);
    }, initalTimer * 1000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div id="maintenance-window">
    <div id="maintenance-box">
      <h3>Wartungsarbeiten</h3>
      <div id="text">
        <p>
          Diese Seite befindet sich noch im Umbau. Bitte probiere es zu einem
          anderen Zeitpunkt erneut.
        </p>
        <p>Du wirst in {timer} Sekunden zurückgeleitet!</p>
        <div id="contact">
          <MobileButton text="Kontakt" path="/info/contact" bgColor="#ff7a00" />
        </div>
      </div>
      <div id="maintenance-icon">
        <RoundedIcon
          icon="pylon"
          bgColor="white"
        />
      </div>
    </div>
    </div>
  );
}
