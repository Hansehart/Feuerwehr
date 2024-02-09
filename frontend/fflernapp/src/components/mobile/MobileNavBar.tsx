import RoundedIcon from "../RoundedIcon";
import "./MobileNavBarStyle.css";

export default function MobileNavBar() {
  return (
    <>
      <nav>
        <RoundedIcon icon="firefighter" bgColor="#ffffff" button={true} />
        <RoundedIcon icon="firefighter" bgColor="#ffffff" button={true} />
        <RoundedIcon icon="firefighter" bgColor="#ffffff" button={true} />
      </nav>
    </>
  );
}
