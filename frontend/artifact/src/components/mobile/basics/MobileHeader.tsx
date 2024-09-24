import "./MobileHeaderStyle.css";
import { useNavigate } from 'react-router-dom';

interface MobileHeaderProps {
  department?: boolean;
  link: string;
  name: string;
}

export default function MobileHeader({ department, link, name }: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <header 
      className="border-b-4 border-secondary cursor-pointer" 
      style={{ minHeight: department ? "20vh" : "15vh" }}
      onClick={handleClick}
    >
      <section id="header-title">
        {department ? (
          <h1 data-text={"Feuerwehr " + name}>
            Feuerwehr<br />
            {name}
          </h1>
        ) : (
          <h1 data-text={name}>{name}</h1>
        )}
      </section>
    </header>
  );
}