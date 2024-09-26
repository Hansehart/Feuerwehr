import { useEffect, useState } from "react";

interface NotificatorProps {
  type: "success" | "warning" | "error";
  text: string;
  onClose?: () => void; // update app state if needed
}

export default function Notificator({ type, text, onClose }: NotificatorProps) {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Determine the title based on the type
    setTitle(
      type === "success" ? "Erfolg" :
      type === "warning" ? "Warnung" : "Fehler"
    );

    // Show the notification
    setShow(true);
    setProgress(100);

    // Start the progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0));
    }, 30); // Update every 30ms for smooth animation

    // Hide after 3 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, [type, text, onClose]);

  const bgColor = 
    type === "success" ? "bg-success" :
    type === "warning" ? "bg-warning" : "bg-error";

  const borderColor = 
    type === "success" ? "border-green-600" :
    type === "warning" ? "border-orange-600" : "border-secondary";

  return (
    <div className={`fixed top-4 right-4 w-11/12 max-w-md z-50 transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-full"}`}>
      <div className={`${bgColor} border-l-8 ${borderColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4 font-brooklyn">
          <h3 className="text-2vh font-bold text-primary font-teko">{title}</h3>
          <p className="text-2vh mt-1 text-primary">{text}</p>
        </div>
        <div 
          className="h-1 bg-white bg-opacity-50 transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}