import { useNavigate } from "react-router-dom";
import "./MobileButtonStyle.css"

interface MobileButtonProps {
  text: string;
  path: string;
  bgColor?: string;
}

export default function MobileButton({text, path, bgColor="#ea4138"}: MobileButtonProps) {
  const navigate = useNavigate();
  const forward = () => {
    navigate(path);
  };

  return (
    <button onClick={forward} style={{backgroundColor: bgColor}}>
        {text}
    </button>
  );
}
