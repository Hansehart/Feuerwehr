import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

interface DirectoryProps {
  title: string;
  type: string;
  navbar: string;
}

function Directory({ title, type, navbar }: DirectoryProps) {
  const { changeView } = useNavbar();

  // Function to generate titleLink from link
  const getTitleLink = (link: string): string => {
    const parts = link.split('/').filter(Boolean);
    if (parts.length <= 1) return '/';
    return '/' + parts.slice(0, -1).join('/');
  };
  const titleLink = getTitleLink(type);

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