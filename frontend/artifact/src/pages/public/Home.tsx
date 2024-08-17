import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileAuthPreview from "../../components/mobile/views/MobileAuthPreview";
import MobileDepartmentPreview from "../../components/mobile/views/MobileDepartmentPreview";
import MobileImprintFooter from "../../components/mobile/basics/MobileImprintFooter";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("");

  const changeView = (view: string) => {
    setSelect(view);
  };

  // init values
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
      displayComponent = <MobileBody type="/learn" marginToFooter="15vh" />;
      window.history.replaceState({}, "");
      break;
    case "department":
      displayComponent = (
        <MobileBody before={<MobileDepartmentPreview />} after={<MobileImprintFooter/>}/> // type is for public page not set because their should be no content loaded
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = (
        <MobileBody before={<MobileAuthPreview />}/> // type is for public page not set because their should be no content loaded
      );
      window.history.replaceState({}, "");
      break;
    default:
      displayComponent = <MobileBody />;
  }

  return (
    <div>
      <MobileHeader name="Feuerwehr" />
      {displayComponent}
      <MobileNavBar changeView={changeView} preset={`${select}`} />
    </div>
  );
}

export default Home;
