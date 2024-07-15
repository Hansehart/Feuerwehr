import "./MobileDepartmentPreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

export default function MobileDepartmentPreview() {
  return (
    <section
      className="department"
      style={{ backgroundImage: `url(${drivingFirefighters})` }}
    >
      <div className="department-preview">
        <div className="department-text">
          <p>Um eine Wache im Detail sehen zu können,</p>
          <p>melde dich bitte an.</p>

          <p>Bist Du in noch keiner Feuerwehr?</p>
          <p>Finde auf unserer Karte die Nächste!</p>
        </div>
        <div className="choose-buttons">
          <MobileButton text="Karte" path="/main/map"></MobileButton>
          <MobileButton text="Kontakt" path="/profile/contact"></MobileButton>
        </div>
      </div>
    </section>
  );
}
