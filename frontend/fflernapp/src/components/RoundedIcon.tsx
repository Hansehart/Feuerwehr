import "./RoundedIconStyle.css";

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
      return "src/assets/icons/firefighter.png";
    case "vehicle-b":
      return "src/assets/icons/firefighter-vehicle-blue.png";
    case "vehicle-r":
      return "src/assets/icons/firefighter-vehicle-red.png";
    case "book":
      return "src/assets/icons/book.png";
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
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill={bgColor}
          stroke={isActive ? strokeActive : stroke}
          strokeWidth={isActive ? strokeWidthActive : strokeWidth}
        />
        <image href={getIconPath(icon)} x="25" y="25" width="50" height="50" />
      </svg>
    </div>
  );
}
