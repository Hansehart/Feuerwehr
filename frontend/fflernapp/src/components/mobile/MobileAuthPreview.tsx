import "./MobileAuthPreviewStyle.css";

import MobileButton from "./MobileButton";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

export default function MobileAuthPreview() {
  return (
    <section
      className="auth"
      style={{ backgroundImage: `url(${drivingFirefighters})` }}
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
          <MobileButton text="Registrieren" path="/profile/register"></MobileButton>
          <MobileButton text="Anmelden" path="/profile/login"></MobileButton>
        </div>
      </div>
    </section>
  );
}
