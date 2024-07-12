import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MaintenanceStyle.css";
import RoundedIcon from "./RoundedIcon";

export default function Maintenance() {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const newPath = window.location.pathname.split("/").slice(0, -1).join("/");
      navigate(newPath);
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="box">
      <h2>TWartungsarbeiten</h2>
      <p>Diese Seite befindet sich noch im Umbau. Bitte probiere es zu einem anderen Zeitpunkt erneut.</p>
      <p>Du wirst in {timer} Sekunden zurückgeleitet!</p>
      <RoundedIcon icon="pylon" bgColor="orange"/>
    </div>
  );
}
