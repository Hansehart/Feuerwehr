import "./MobileDepartmentPreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";

export default function MobileDepartmentPreview() {
  return (
    <section
      className="department"
      style={{ backgroundImage: `url(${highwayAccident})` }}
    >
      <div className="department-preview">
        <div className="department-text">
          <p>
            Um eine Wache im Detail sehen zu können,
            <br />
            melde dich bitte an.
          </p>

          <p>
            Du bist in noch keiner Feuerwehr? 
            <br />
            Schau direkt mal auf die Karte!
          </p>
        </div>
        <div className="choose-buttons">
          <MobileButton text="Karte" path="/main/map"></MobileButton>
          <MobileButton text="Kontakt" path="/profile/contact"></MobileButton>
        </div>
      </div>
    </section>
  );
}
