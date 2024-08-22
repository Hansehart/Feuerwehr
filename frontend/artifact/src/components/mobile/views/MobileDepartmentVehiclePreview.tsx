import "./MobileDepartmentPreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";

export default function MobileDepartmentPreview() {
  return (
    <section className="department">
      <div
        className="department-background"
        style={{ backgroundImage: `url(${highwayAccident})` }}
      ></div>
      <div className="department-preview">
        <div className="department-text">
          <p>
            Um eine Wache im Detail sehen zu können,
            melde dich bitte an.
          </p>

          <p>
            Du bist in noch keiner Feuerwehr?
            <br />
            Schau direkt mal auf die Karte!
          </p>
        </div>
        <div className="choose-buttons">
          <MobileButton text="Karte" path="/info/map"></MobileButton>
          <MobileButton text="Erstellen" path="/profile/register/profile"></MobileButton>
        </div>
      </div>
    </section>
  );
}
