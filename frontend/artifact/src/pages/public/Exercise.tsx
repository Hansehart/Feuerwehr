import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileQuizCard from "../../components/mobile/special/MobileQuizCard";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";

function Exercise() {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState("");
  const [category, setCategory] = useState("any");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [location]);

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
      <MobileBody main={<MobileQuizCard category={category}/>}/>
      <MobileNavBar changeView={changeView} preset="learn" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Exercise;