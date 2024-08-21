import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import ProgressBall from "../../components/general/ProgressBall";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("");
  const [username, setUsername] = useState("");
  const [firedepartment, setFiredepartment] = useState("");

  const changeView = (view: string) => {
    setSelect(view);
  };

  // init values
  useEffect(() => {
    // check if there's state and a select value in the state
    if (location.state && location.state.select) {
      setSelect(location.state.select);
    }

    fetch("https://feuerwehr.hansehart.de/api/service/receive/user?attr=name")
      .then((response) => response.json())
      .then((data) => setUsername(data.content));

    fetch("https://feuerwehr.hansehart.de/api/service/receive/firedepartment?attr=name")
      .then((response) => response.json())
      .then((data) => setFiredepartment(data.content));
  }, []);

  // decide which body to display
  let displayComponent;

  switch (select) {
    case "learn":
      displayComponent = (
        <MobileBody
          before={
            <div className="mt-4 mb-4 text-center">
              <ProgressBall></ProgressBall>
              <h3>Lernfortschritt</h3>
            </div>
          }
          type="/learn"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "department":
      displayComponent = (
        <MobileBody
          before={
            <div style={{ textAlign: "center", margin: "2em" }}>
              <h3>{username? `Moin ${username}!` : "Moin!"}</h3>
            </div>
          }
          type="/vehicle"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = (
        <MobileBody type="/profile"
        />
      );
      window.history.replaceState({}, "");
      break;
    default:
      displayComponent = <MobileBody />;
  }

  return (
    <div>
      <MobileHeader department={true} name={firedepartment} />
      {displayComponent}
      <MobileNavBar changeView={changeView} preset={`${select}`} />
    </div>
  );
}

export default Home;
