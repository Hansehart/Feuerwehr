import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import ProgressBall from "../../components/ProgressBall";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("department");
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

    fetch("https://fflernapp.hansehart.de/api/service/receive/user?attr=name")
      .then((response) => response.json())
      .then((data) => setUsername(data.msg));

    fetch("https://fflernapp.hansehart.de/api/service/receive/firedepartment?attr=name")
      .then((response) => response.json())
      .then((data) => setFiredepartment(data.msg));
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
          marginToFooter="18vh"
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
          type="vehicle"
          marginToFooter="18vh"
        />
      );
      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = (
        <MobileBody type="profile"
        marginToFooter="18vh"
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
