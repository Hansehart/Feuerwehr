import { useNavigate } from "react-router-dom";
import "./MobileButtonStyle.css"

interface MobileButtonProps {
  text: string;
  path: string;
}

export default function MobileButton({text, path}: MobileButtonProps) {
  const navigate = useNavigate();
  const forward = () => {
    navigate(path);
  };

  return (
    <button onClick={forward}>
        {text}
    </button>
  );
}
