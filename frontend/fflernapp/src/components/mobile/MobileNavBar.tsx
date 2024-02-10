import { useState } from "react";
import RoundedIcon from "../RoundedIcon";
import "./MobileNavBarStyle.css";

export default function MobileNavBar() {
  const [activeButton, setActiveButton] = useState("");

  const buttons = [{ id: "left" }, { id: "mid" }, { id: "right" }];

  const handleIconClick = (buttonID: string) => {
    setActiveButton(buttonID);
  };

  return (
    <>
      <nav>
        {buttons.map((button) => (
          <RoundedIcon
            key={button.id}
            icon="firefighter"
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
