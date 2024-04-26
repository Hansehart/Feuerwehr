import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileAuthPreview from "../../components/mobile/MobileAuthPreview";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("department");

  const changeView = (view: string) => {
    setSelect(view);
  };

  // init values
  useEffect(() => {
    // check if user is authenticated (so he should go to the private homepage)
    fetch("https://fflernapp.hansehart.de/api/service/auth")
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          window.location.reload();
        }
      });

    // check if there's state and a select value in the state
    if (location.state && location.state.select) {
      setSelect(location.state.select);
    }
  }, []);

  // decide which body to display
  let displayComponent;

  switch (select) {
    case "learn":
      displayComponent = <MobileBody type="learn" marginToFooter="18vh" />;
      window.history.replaceState({}, "");
      break;
    case "department":
      displayComponent = (
        <MobileBody
          before={
            <div style={{ textAlign: "center", margin: "2em" }}>
              <h3>Moin!</h3>
            </div>
          }
          type="main"
          marginToFooter="18vh"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = (
        <MobileBody before={<MobileAuthPreview />} type="profile" />
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
