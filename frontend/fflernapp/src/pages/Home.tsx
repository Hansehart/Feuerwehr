import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import ProgressBall from "../components/ProgressBall";

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
              <h2>Lernfortschritt</h2>
            </div>
          }
          numberOfCards={2}
        />
      );
      window.history.replaceState({}, "");
      break;
    case "department":
      displayComponent = (
        <MobileBody
          before={
            <div style={{ textAlign: "center", margin: "2em" }}>
              <h2>Moin, Username!</h2>
            </div>
          }
          numberOfCards={3}
        />
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = <MobileBody numberOfCards={1} />;
      window.history.replaceState({}, "");
      break;
    default:
      displayComponent = <MobileBody numberOfCards={1} />;
  }

  return (
    <div>
      <MobileHeader name="Mollhagen" />
      {displayComponent}
      <MobileNavBar changeView={changeView} preset={`${select}`} />
    </div>
  );
}

export default Home;
