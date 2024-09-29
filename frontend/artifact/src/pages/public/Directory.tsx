import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";


interface DirectoryProps {
    title: string; 
    titleLink: string; // link when clicking on title
    type: string; // cards to fetch
    navbar: string;
  }
  function Directory({ title, titleLink, type, navbar }: DirectoryProps) {
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
      <MobileHeader name={title} link={titleLink}/>
      <MobileBody type={type}/>
      <MobileNavBar changeView={changeView} preset={navbar} />
      <MobileInfoFooter/>
    </div>
  );
}

export default Directory;
