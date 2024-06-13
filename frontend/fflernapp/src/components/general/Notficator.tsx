import { useEffect } from "react";
import "./NotficatorStyle.css";

interface NotificatorProps {
  text: string;
}

export default function Notficator({ text }: NotificatorProps) {


  useEffect(() => {

  })

  return (
    <div className="window">
      <h2>{text}</h2>
    </div>
  );
}
