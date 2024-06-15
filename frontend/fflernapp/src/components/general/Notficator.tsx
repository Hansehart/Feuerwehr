import "./NotficatorStyle.css";

interface NotificatorProps {
  text: string;
}

export default function Notficator({ text }: NotificatorProps) {
  return (
    <div className="window">
      <div className="box">
        <div className="text">
        <h3>Success</h3>
        <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
