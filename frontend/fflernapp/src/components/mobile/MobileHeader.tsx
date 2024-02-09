import "./MobileHeaderStyle.css";

export default function MobileHeader({ name }: { name: string }) {
  return (
    <header>
      <h1 data-text={"Feuerwehr " + name}>
        Feuerwehr<br></br>
        {name}
      </h1>
    </header>
  );
}
