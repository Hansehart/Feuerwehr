import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import Maintenance from "../../components/general/Maintenance";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function Construction() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Feuerwehr" link="/home" />
      <MobileBody fullscreen={<Maintenance />} />
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
}

export default Construction;
