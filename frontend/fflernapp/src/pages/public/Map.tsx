import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import Maintenance from "../../components/general/Maintenance";

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
      <iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=6.6192626953125%2C53.227412682397365%2C11.889953613281252%2C55.22432367289142&amp;layer=mapnik"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=9/54.2379/9.2546">Größere Karte anzeigen</a></small>
      {/* <MobileBody main={<Maintenance/>} marginToFooter="15vh"/> */}
      {/* <MobileNavBar changeView={changeView} preset="department" /> */}
    </div>
  );
}

export default Map;
