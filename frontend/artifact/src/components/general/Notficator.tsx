import { useEffect, useState } from "react";

interface NotificatorProps {
  type: "success" | "warning" | "error";
  text: string;
  onClose?: () => void;
}

export default function Notificator({ type, text, onClose }: NotificatorProps) {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTitle(
      type === "success" ? "Erfolg" :
      type === "warning" ? "Warnung" : "Fehler"
    );
    setShow(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

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

  const progressColor =
    type === "success" ? "bg-green-600" :
    type === "warning" ? "bg-orange-600" : "bg-secondary";

  return (
    <div
      className={`fixed top-4 right-4 w-11/12 max-w-md z-50 transition-all duration-300 ease-in-out ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${bgColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4 font-brooklyn">
          <h3 className="text-2vh font-bold text-primary font-teko">{title}</h3>
          <p className="text-2vh mt-1 text-primary">{text}</p>
        </div>
        <div className="h-1 bg-white bg-opacity-25">
          <div
            className={`h-full ${progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}