import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import MobileMapPreview from "../../components/mobile/views/MobileMapView";
import { useNavbar } from "../../hooks/useNavbar";

function Map() {
  const { changeView } = useNavbar();
  return (
    <div>
      <MobileHeader name="Karte" link="/info/map"/>
      <h3>*** Karte ***</h3>
      <MobileBody main={<MobileMapPreview/>}/>
      <MobileNavBar changeView={changeView} preset="department" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Map;
