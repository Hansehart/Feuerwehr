import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileImprintFooter from "../../components/mobile/basics/MobileInfoFooter";
import MobileMapPreview from "../../components/mobile/views/MobileMapPreview";

function Map() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

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
      <MobileHeader name="Karte" />
      <h3>*** Karte ***</h3>
      <MobileBody main={<MobileMapPreview/>}/>
      <MobileNavBar changeView={changeView} preset="department" />
      <MobileImprintFooter/>
    </div>
  );
}

export default Map;
