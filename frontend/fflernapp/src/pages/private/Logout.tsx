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

  fetch("https://fflernapp.hansehart.de/api/service/logout", {
    credentials: "include",
    method: "GET",
  }).then(() => {
    updateAuthStatus(true);
    //navigate("/home");
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
      <MobileBody
        main={<LoadingCircle />}
        after={<p>Bitte warten Sie einen Moment.</p>}
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Logout;
