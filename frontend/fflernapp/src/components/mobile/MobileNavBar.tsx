import { useEffect, useState } from "react";
import RoundedIcon from "../general/RoundedIcon";
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
    { id: "department", icon: "vehicle-b" },
    { id: "profile", icon: "firefighter" },
  ];

  const handleIconClick = (buttonID: string) => {
    setActiveButton(buttonID);
    changeView(buttonID);
  };

  return (
    <>
      <nav>
        {buttons.map((button) => (
          <RoundedIcon
            key={button.id}
            icon={button.icon}
            bgColor="#ffffff"
            strokeWidth="10"
            isActive={activeButton === button.id}
            strokeActive="#ea4138"
            strokeWidthActive="5"
            onClick={() => handleIconClick(button.id)}
          />
        ))}
      </nav>
    </>
  );
}
