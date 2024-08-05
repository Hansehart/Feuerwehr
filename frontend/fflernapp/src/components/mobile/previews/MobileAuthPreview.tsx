import "./MobileAuthPreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";

export default function MobileAuthPreview() {
  return (
    <section
      className="auth"
      style={{ backgroundImage: `url(${highwayAccident})` }}
    >
      <div className="auth-preview">
        <div className="auth-text">
          <p>
            Um die Profilseite nutzen zu können,
            <br />
            melde dich bitte an.
          </p>
        </div>
        <div className="auth-buttons">
          <MobileButton text="Registrieren" path="/profile/register/account"></MobileButton>
          <MobileButton text="Anmelden" path="/profile/login"></MobileButton>
        </div>
      </div>
    </section>
  );
}
