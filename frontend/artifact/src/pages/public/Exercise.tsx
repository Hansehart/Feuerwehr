import QuizCard from "../../components/special/Quizcard";
import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function Exercise() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Übung" link="/learn/exercises" />
      <MobileBody fullscreen={<QuizCard />} />
      <MobileNavBar changeView={changeView} preset="learn" />
      <MobileInfoFooter />
    </div>
  );
}

export default Exercise;
