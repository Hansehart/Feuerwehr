import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileQuizCard from "../../components/mobile/MobileQuizCard";
import Maintenance from "../../components/general/Maintenance";

function Contact() {
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
      <MobileHeader name="Kontakt" />
      <MobileBody main={<Maintenance/>}/>
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Contact;
