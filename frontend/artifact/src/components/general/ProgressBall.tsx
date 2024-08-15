import { useEffect } from "react";
import "./ProgressBallStyle.css";



export default function ProgressBall() {
  const progress = 72;

  useEffect(() => {
    const bar = document.getElementById("bar");
    // 25% -> 80 deg, 50% -> 160 deg, 100% -> 320 deg (ref: ProgressBallStyle.css)
    const angle = String(progress * 3.2) + "deg";
    bar?.style.setProperty("--angle", angle);
  }, [progress]);

  return (
    <div className="container flex flex-col items-center">
      <div className="ball" id="route"></div>
      <div className="ball" id="bar"></div>
      <div id="circle">
        <h3>{progress}%</h3>
      </div>
    </div>
  );
}
