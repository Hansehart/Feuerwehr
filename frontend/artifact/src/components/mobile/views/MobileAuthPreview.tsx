import "./MobileAuthPreviewStyle.css";

import MobileButton from "../basics/MobileButton";
import firefighterPortrait from "/src/assets/pictures/firefighter-portrait.jpg";

export default function MobileAuthPreview() {
  return (
    <section className="auth">
      <div
        className="auth-background"
        style={{ backgroundImage: `url(${firefighterPortrait})` }}
      ></div>
      <div className="auth-preview">
        <div className="auth-text">
          <p>
            Um die Profilseite nutzen zu können,
            <br />
            melde dich bitte an.
          </p>
        </div>
        <div className="auth-buttons mt-8">
          <MobileButton
            text="Registrieren"
            path="/profile/register/account"
          ></MobileButton>
          <MobileButton text="Anmelden" path="/profile/login"></MobileButton>
        </div>
      </div>
    </section>
  );
}
