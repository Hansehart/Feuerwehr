import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileStartPreview from "../../components/mobile/views/MobileStartPreview";
import MobileImprintFooter from "../../components/mobile/basics/MobileInfoFooter";
import Notificator from "../../components/general/Notficator";

function Start() {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState("");
  const notification = location.state?.notification;

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
      <MobileHeader name="Feuerwehr" />
      {notification && (
        <Notificator
          type={notification.type}
          text={notification.message}
        />
      )}
      <MobileBody main={<MobileStartPreview/>}/>
      <MobileNavBar changeView={changeView} preset="" />
      <MobileImprintFooter/>
    </div>
  );
}

export default Start;
