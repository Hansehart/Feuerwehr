import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";


function Courses() {

  const { changeView } = useNavbar();


  return (
    <div>
      <MobileHeader name="Lehrgänge" link="/learn/courses"/>
      <MobileBody/>
      <MobileNavBar changeView={changeView} preset="learn" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Courses;
