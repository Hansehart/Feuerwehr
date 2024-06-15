import "./NotficatorStyle.css";

interface NotificatorProps {
  text: string;
}

export default function Notficator({ text }: NotificatorProps) {

  return (
    <div className="window">
      <h2>{text}</h2>
    </div>
  );
}
