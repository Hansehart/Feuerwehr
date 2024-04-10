import { useEffect, useState } from "react";
import "./ProgressBallStyle.css";



export default function ProgressBall() {
  const [progress, setProgess] = useState(72);

  useEffect(() => {
    const bar = document.getElementById("bar");
    // 25% -> 80 deg, 50% -> 160 deg, 100% -> 320 deg (ref: ProgressBallStyle.css)
    const angle = String(progress * 3.2) + "deg";
    console.log(angle);
    bar?.style.setProperty("--angle", angle);
    console.log()
  }, [progress]);

  return (
    <div className="container">
      <div className="ball" id="route"></div>
      <div className="ball" id="bar"></div>
      <div id="circle">
        <h3>{progress}%</h3>
      </div>
    </div>
  );
}
