import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import ProgressBall from "../components/ProgressBall";
import MobileButton from "../components/mobile/MobileButton";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("department");

  const changeView = (view: string) => {
    setSelect(view);
  };

  useEffect(() => {
    // check if there's state and a select value in the state
    if (location.state && location.state.select) {
      setSelect(location.state.select);
    }
  }, []);

  // decide which body to display
  let displayComponent;

  switch (select) {
    case "learn":
      displayComponent = (
        <MobileBody
          before={
            <div style={{ textAlign: "center" }}>
              <ProgressBall></ProgressBall>
              <h3>Lernfortschritt</h3>
            </div>
          }
          type="learn"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "department":
      displayComponent = (
        <MobileBody
          before={
            <div style={{ textAlign: "center", margin: "2em" }}>
              <h3>Moin, Username!</h3>
            </div>
          }
          type="vehicle"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = <MobileBody before={<div className="auth-preview"><MobileButton text="Registrieren"></MobileButton><MobileButton text="Anmelden"></MobileButton></div>} type="/profile" />;
      window.history.replaceState({}, "");
      break;
    default:
      displayComponent = <MobileBody type="" />;
  }

  return (
    <div>
      <MobileHeader department={true} name="Mollhagen" />
      {displayComponent}
      <MobileNavBar changeView={changeView} preset={`${select}`} />
    </div>
  );
}

export default Home;
