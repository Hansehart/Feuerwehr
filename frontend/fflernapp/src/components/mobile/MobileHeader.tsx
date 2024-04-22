import "./MobileHeaderStyle.css";

interface MobileHeaderProps {
  department?: boolean;
  name: string;
}

export default function MobileHeader({ department, name }: MobileHeaderProps) {
  return (
    <header style={{ minHeight: department ? "20vh" : "15vh" }}>
      {department ? (
        <h1 data-text={"Feuerwehr " + name}>
          Feuerwehr<br></br>
          {name}
        </h1>
      ) : (
        <h1 data-text={name}>{name}</h1>
      )}
    </header>
  );
}
