import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import LoadingCircle from "../../components/general/LoadingCircle";

function Logout({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  fetch("https://feuerwehr.hansehart.de/api/service/logout", {
    credentials: "include",
    method: "GET",
  }).then(() => {
    updateAuthStatus(false);
    navigate("/home", {
      state: { notification: {type: "success", message: "Erfolgreich abgemeldet!"} },
    });
  });

  useEffect(() => {
    switch (select) {
      case "learn":
        navigate("/home", { state: { select: "learn" } });
        break;
      case "department":
        navigate("/home", { state: { select: "department" } });
        break;
      case "profile":
        navigate("/home", { state: { select: "profile" } });
        break;
    }
  }, [select]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  return (
    <div>
      <MobileHeader name="Logout" />
      <div style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <MobileBody
        main={<LoadingCircle />}
        after={<p>Bitte warten Sie einen Moment.</p>}
      />
      </div>
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Logout;
