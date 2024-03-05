import "./RoundedIconStyle.css";
import firefighter from "/src/assets/icons/firefighter.png";
import vehicleB from "/src/assets/icons/firefighter-vehicle-blue.png";
import vehicleR from "/src/assets/icons/firefighter-vehicle-red.png";
import book from "/src/assets/icons/book.png";

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
    case "vehicle-b":
      return vehicleB;
    case "vehicle-r":
      return vehicleR;
    case "book":
      return book;
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
          r="30"
          fill={bgColor}
          stroke={isActive ? strokeActive : stroke}
          strokeWidth={isActive ? strokeWidthActive : strokeWidth}
        />
        <image href={getIconPath(icon)} x="25" y="25" width="50" height="50" />
      </svg>
    </div>
  );
}
