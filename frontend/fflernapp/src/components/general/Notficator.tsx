import "./NotficatorStyle.css";

interface NotificatorProps {
  text: string;
}

export default function Notficator({ text }: NotificatorProps) {
  return (
    <div className="box">
      <div className="message">
        <h2>{text}</h2>
      </div>
    </div>
  );
}
