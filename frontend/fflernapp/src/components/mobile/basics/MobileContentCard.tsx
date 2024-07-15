import { useNavigate } from "react-router-dom";
import RoundedIcon from "../../general/RoundedIcon";
import "./MobileContentCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface MobileContentCardProps {
  title: string;
  subtitle: string;
  path: string;
}

export default function MobileContentCard({
  title,
  subtitle,
  path,
}: MobileContentCardProps) {
  const navigate = useNavigate();

  const handeClick = () => {
    navigate(path);
  };

  return (
    <section
      className="content-card-section"
      style={{ backgroundImage: `url(${drivingFirefighters})` }}
      onClick={handeClick}
    >
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <RoundedIcon icon="vehicle-r" bgColor="#000000d6" stroke="#ea4138" />
    </section>
  );
}
