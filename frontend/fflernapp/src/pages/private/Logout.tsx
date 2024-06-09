import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";

function Login({
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
      updateAuthStatus(false);
      navigate("/home");
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
        main={<h2>Please wait a moment</h2>}
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Login;
