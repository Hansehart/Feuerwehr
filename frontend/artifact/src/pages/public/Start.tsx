import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileStartPreview from "../../components/mobile/views/MobileStartPreview";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function Start() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Feuerwehr" link="/home"/>
      <MobileBody fullscreen={<MobileStartPreview/>}/>
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Start;
