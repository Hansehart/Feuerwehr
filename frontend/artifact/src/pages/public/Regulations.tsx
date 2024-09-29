import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function Regulations() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Vorschriften" link="/learn/regulations" />
      <MobileBody />
      <MobileNavBar changeView={changeView} preset="learn" />
      <MobileInfoFooter />
    </div>
  );
}

export default Regulations;
