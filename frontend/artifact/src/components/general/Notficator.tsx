import { useEffect, useState } from "react";

interface NotificatorProps {
  type: "success" | "warning" | "error";
  text: string;
  onClose?: () => void;
}

export default function Notificator({ type, text, onClose }: NotificatorProps) {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTitle(
      type === "success" ? "Erfolg" :
      type === "warning" ? "Warnung" : "Fehler"
    );

    setShow(true);
    setProgress(100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev - 1;
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

  const borderColor = 
    type === "success" ? "border-green-600" :
    type === "warning" ? "border-orange-600" : "border-secondary";

  return (
    <div 
      className={`fixed top-4 right-4 w-11/12 max-w-md z-50 transition-all duration-300 ease-in-out ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${bgColor} border-l-8 ${borderColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4 font-brooklyn">
          <h3 className="text-2vh font-bold text-primary font-teko">{title}</h3>
          <p className="text-2vh mt-1 text-primary">{text}</p>
        </div>
        <div className="h-1 bg-white bg-opacity-25">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}