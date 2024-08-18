import { useEffect, useState } from "react";
import "./NotficatorStyle.css";

interface NotificatorProps {
  type: string;
  text: string;
}

export default function Notficator({ type, text }: NotificatorProps) {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false); // New state to track exiting

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
    setExiting(false); // Reset the exiting state

    // Start the exit process after 2.7 seconds (or slightly less than the total time)
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2700); // Slightly before the total duration of 3 seconds

    // Completely hide after the full 3 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 3000); // Duration should match the CSS transition duration

    return () => {
      clearTimeout(exitTimer); // Cleanup the timers if the component unmounts
      clearTimeout(hideTimer);
    };
  }, [type, text]); // Depend on both type and text to trigger re-render

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
