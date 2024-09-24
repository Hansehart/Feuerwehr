import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileImprintFooter from "../../components/mobile/basics/MobileInfoFooter";


interface DirectoryProps {
    title: string;
    type: string;
    navbar: string;
  }
  function Directory({ title, type, navbar }: DirectoryProps) {
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
      <MobileHeader name={title} link="/home"/>
      <MobileBody type={type}/>
      <MobileNavBar changeView={changeView} preset={navbar} />
      <MobileImprintFooter/>
    </div>
  );
}

export default Directory;
