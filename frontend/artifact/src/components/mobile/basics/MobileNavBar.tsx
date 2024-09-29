import { useState, useEffect } from "react";
import RoundedIcon from "../../general/RoundedIcon";
import "./MobileNavBarStyle.css";

export default function MobileNavBar({
  changeView,
  preset,
}: {
  changeView: (viewName: string) => void;
  preset: string;
}) {
  const [activeButton, setActiveButton] = useState(preset);

  useEffect(() => {
    setActiveButton(preset);
  }, [preset]);

  const buttons = [
    { id: "learn", icon: "book" },
    { id: "department", icon: "firedepartment" },
    { id: "profile", icon: "firefighter" },
  ];

  const handleIconClick = (buttonID: string) => {
    setActiveButton(buttonID);
    changeView(buttonID);
  };

  return (
    <nav className="border-t-4 border-secondary z-20">
      {buttons.map((button) => (
        <RoundedIcon
          key={button.id}
          icon={button.icon}
          bgColor="#ffffff"
          stroke="#05192a"
          strokeWidth="2"
          isActive={activeButton === button.id}
          strokeActive="#ea4138"
          strokeWidthActive="5"
          onClick={() => handleIconClick(button.id)}
        />
      ))}
    </nav>
  );
}