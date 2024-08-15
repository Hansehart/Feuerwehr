import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";

interface DirectoryProps {
    type: string;
    navbar: string;
  }
  function Directory({ type, navbar }: DirectoryProps) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  // runs only on first render
  useEffect(() => {
    console.log(navbar + "11111")
    setSelect(navbar)
  }, [])

  useEffect(() => {
    console.log(navbar + "22222")
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
      <MobileBody type={type} marginToFooter="15vh"/>
      <MobileNavBar changeView={changeView} preset="department" />
    </div>
  );
}

export default Directory;
