import "./MobileDepartmentPrivatePreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";

interface MobileDepartmentPrivatePreviewProps {
  text: React.ReactNode; // Change this to accept a string instead of ReactHTMLElement
}

export default function MobileDepartmentPrivatePreview({ text }: MobileDepartmentPrivatePreviewProps) {
  return (
    <section className="department">
      <div
        className="department-background"
        style={{ backgroundImage: `url(${highwayAccident})` }}
      ></div>
      <div className="department-preview">
        <div className="department-text">
          <p>{text}</p>
        </div>
        <div className="choose-buttons">
          <MobileButton text="Karte" path="/info/map"></MobileButton>
          <MobileButton text="Erstellen" path="/profile/register/profile"></MobileButton>
        </div>
      </div>
    </section>
  );
}
