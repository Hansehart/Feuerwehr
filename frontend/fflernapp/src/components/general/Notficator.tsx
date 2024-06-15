import "./NotficatorStyle.css";

interface NotificatorProps {
  text: string;
}

export default function Notficator({ text }: NotificatorProps) {
  return (
    <div className="window" id="notficator">
      <div className="box">
        <div className="text">
        <h3>Erfolg</h3>
        <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
