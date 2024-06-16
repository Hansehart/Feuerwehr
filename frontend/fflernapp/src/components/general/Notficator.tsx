import "./NotficatorStyle.css";

interface NotificatorProps {
  type: string;
  text: string;
}

export default function Notficator({ type, text }: NotificatorProps) {
  const notificator = document.getElementById("notificator-box");
  if (notificator) {
    if (type === "success") {
      notificator.style.backgroundColor = "#8bdf84";
      notificator.style.borderLeft = "1em solid #029902;";
    }
  }

  return (
    <div className="window" id="notificator-window">
      <div className="box" id="notificator-box">
        <div className="text">
          <h3>Erfolg</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
