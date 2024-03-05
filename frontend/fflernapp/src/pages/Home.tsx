import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";

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
  }, [location.state]);

  // decide which body to display
  let displayComponent;
  switch (select) {
    case "learn":
      displayComponent = <MobileBody numberOfCards={5} />;
      break;
    case "department":
      displayComponent = <MobileBody numberOfCards={3} />;
      break;
    case "profile":
      displayComponent = <MobileBody numberOfCards={1} />;
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
