import { useEffect, useState } from "react";
import "./NotficatorStyle.css";

interface NotificatorProps {
  type: string;
  text: string;
  onClose?: () => void; // New prop to handle notification close
}

export default function Notficator({ type, text, onClose }: NotificatorProps) {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Determine the title based on the type
    if (type === "success") {
      setTitle("Erfolg");
    } else if (type === "warning") {
      setTitle("Warnung");
    } else if (type === "error") {
      setTitle("Fehler");
    }

    // Show the notification
    setShow(true);
    setExiting(false);

    // Start the exit process after 2.7 seconds
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2700);

    // Completely hide after the full 3 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        onClose(); // Invoke the onClose callback to reset the notification state
      }
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [type, text, onClose]);

  return (
    <div className={`window ${show ? "show" : ""}`}>
      <div className={`box ${type} ${show && !exiting ? "show" : "hide"}`}>
        <div className="text">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}