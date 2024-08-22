import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import ProgressBall from "../../components/general/ProgressBall";
import MobileDepartmentPrivatePreview from "../../components/mobile/views/MobileDepartmentPrivatePreview";
import Notificator from "../../components/general/Notficator";

function Home() {
  const location = useLocation();
  const [select, setSelect] = useState("department");
  const [username, setUsername] = useState("");
  const [firedepartment, setFiredepartment] = useState<string | null>("");
  const notification = location.state?.notification;

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

    fetch(
      "https://feuerwehr.hansehart.de/api/service/receive/firedepartment?attr=name"
    )
      .then((response) => {
        if (response.status === 403) {
          // user is known but has no membership, handle this silently
          setFiredepartment(null);
          // resolve the promise with null or undefined to prevent further processing
          return null;
        }
        // For other status codes, continue with normal processing
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFiredepartment(data.content);
        }
      });
  }, []);

  // decide which body to display
  let displayComponent;

  switch (select) {
    case "learn":
      displayComponent = (
        <MobileBody
          before={
            <div className="mt-4 mb-4 flex flex-col items-center text-center">
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
      if (firedepartment) {
        displayComponent = (
          <MobileBody
            before={
              <div style={{ textAlign: "center", margin: "2em" }}>
                <h3>{username ? `Moin ${username}!` : "Moin!"}</h3>
              </div>
            }
            main={ // when no vehicles are added (list empty)
              <MobileDepartmentPrivatePreview
                text={
                  <>
                    <p>
                      Deine Feuerwehr hat noch keine Inhalte hinzugefügt!
                      <br></br>
                      Nehme Kontakt auf, damit hier Inhalte wie der Fahrzeugbestand und Weiteres erscheint.
                    </p>
                  </>
                }
              />
            }
            type="/vehicle"
          />
        );
      } else {
        displayComponent = // no membership yet
          (
            <MobileBody
              before={
                <MobileDepartmentPrivatePreview
                  text={
                    <>
                      <p>
                        Um eine Wache im Detail sehen zu können, füge eine
                        Feuerwehr deinem Profil hinzu!
                      </p>
                      <p>
                        Du bist in noch keiner Feuerwehr?
                        <br />
                        Schau direkt mal auf die Karte!
                      </p>
                      <p>
                        <p>
                          Alternativ kannst Du dir auch im Lexikon
                          Beispielfahrzeuge und Material anschauen.
                        </p>
                      </p>
                    </>
                  }
                />
              }
            /> // type is for public page not set because their should be no content loaded
          );
      }

      window.history.replaceState({}, "");
      break;
    case "profile":
      displayComponent = <MobileBody type="/profile" />;
      window.history.replaceState({}, "");
      break;
    default:
      displayComponent = <MobileBody />;
  }

  return (
    <div>
      <MobileHeader
        department={firedepartment ? true : false}
        name={firedepartment ? firedepartment : "Feuerwehr"}
      />
      {notification && (
        <Notificator type={notification.type} text={notification.message} />
      )}
      {displayComponent}
      <MobileNavBar changeView={changeView} preset={`${select}`} />
    </div>
  );
}

export default Home;
