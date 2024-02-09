import "./RoundedIconStyle.css";

interface RoundedIconProps {
  stroke?: string;
}

export default function RoundedIcon({ stroke }: RoundedIconProps) {
  return (
    <div className="svg-div">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="#000000d6" stroke={stroke} />
        <image
          href="src/assets/icons/firefighter-vehicle.png"
          x="25"
          y="25"
          width="50"
          height="50"
        />
      </svg>
    </div>
  );
}
