import "./RoundedIconStyle.css";
import firefighter from "/src/assets/icons/firefighter.png";
import firedepartment from "/src/assets/icons/firedepartment.png";
import book from "/src/assets/icons/book.png";
import pylon from "/src/assets/icons/pylon.png"
import hansehart from "/src/assets/icons/hansehart512.png"

interface RoundedIconProps {
  icon: string;
  bgColor: string;
  stroke?: string;
  strokeWidth?: string;

  // button design
  isActive?: boolean;
  strokeActive?: string;
  strokeWidthActive?: string;
  onClick?: () => void;
}

function getIconPath(icon: string) {
  switch (icon) {
    case "firefighter":
      return firefighter;
    case "firedepartment":
      return firedepartment;
    case "book":
      return book;
    case "pylon":
      return pylon;
    case "hansehart":
      return hansehart;
  }
}

export default function RoundedIcon({
  icon,
  bgColor,
  stroke = "none",
  strokeWidth = "1",
  isActive, // button is pressed
  strokeActive, // stroke for pressed buttons
  strokeWidthActive, // width for presses
  onClick,
}: RoundedIconProps) {
  return (
    <div
      // apply styles from svg-div-clicked for active button
      className={"svg-div" + (isActive ? "-clicked" : "")}
      onClick={onClick ? onClick : undefined}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill={bgColor}
          stroke={isActive ? strokeActive : stroke}
          strokeWidth={isActive ? strokeWidthActive : strokeWidth}
        />
        <image href={getIconPath(icon)} x="25" y="25" width="50" height="50" />
      </svg>
    </div>
  );
}
