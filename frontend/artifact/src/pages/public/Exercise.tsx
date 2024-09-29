import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuizCard from "../../components/special/Quizcard";
import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";

function Exercise() {
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
  }, [select, navigate]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  return (
    <div>
      <MobileHeader name="Übung" link="/learn/exercises"/>
      <MobileBody fullscreen={<QuizCard/>}/>
      <MobileNavBar changeView={changeView} preset="learn" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Exercise;