import "./MobileButtonStyle.css"

interface MobileButtonProps {
  text: string;
}

export default function MobileButton({text}: MobileButtonProps) {
  return (
    <button>
        {text}
    </button>
  );
}
