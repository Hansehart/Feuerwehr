import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

interface DirectoryProps {
  title: string;
  titleLink: string; // link when clicking on title
  type: string; // cards to fetch
  navbar: string;
}
function Directory({ title, titleLink, type, navbar }: DirectoryProps) {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name={title} link={titleLink} />
      <MobileBody type={type} />
      <MobileNavBar changeView={changeView} preset={navbar} />
      <MobileInfoFooter />
    </div>
  );
}

export default Directory;
