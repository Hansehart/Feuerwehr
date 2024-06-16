import { useState } from "react";
import "./NotficatorStyle.css";

interface NotificatorProps {
  type: string;
  text: string;
}

export default function Notficator({ type, text }: NotificatorProps) {
  const [title, setTitle] = useState("");

  const notificator = document.getElementById("notificator-box");
  if (notificator) {
    if (type === "success") {
      notificator.style.backgroundColor = "#8bdf84";
      notificator.style.borderLeft = "1em solid #029902;";
      setTitle("Erfolg");
    } else if (type === "warning") {
      notificator.style.backgroundColor = "#d87811";
      notificator.style.borderLeft = "1em solid #dfb984;";
      setTitle("Warnung");
    }
  }

  return (
    <div className="window" id="notificator-window">
      <div className="box" id="notificator-box">
        <div className="text">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
