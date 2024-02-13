import { useState } from "react";
import MobileBody from "./components/mobile/MobileBody";
import MobileHeader from "./components/mobile/MobileHeader";
import MobileNavBar from "./components/mobile/MobileNavBar";

function App() {
  const [currentView, setCurrentView] = useState("department");

  const changeView = (view: string) => {
    setCurrentView(view);
  };

  // decide which body to display
  let displayComponent;
  switch (currentView) {
    case "learn":
      displayComponent = <MobileBody numberOfCards={5} />;
      break;
    case "department":
      displayComponent = <MobileBody numberOfCards={3} />;
      break;
    case "profile":
      displayComponent = <MobileBody numberOfCards={1} />;
      break;
    default:
      displayComponent = <MobileBody numberOfCards={1} />;
  }

  return (
    <div>
      <MobileHeader name="Mollhagen" />
      {displayComponent}
      <MobileNavBar changeView={changeView} />
    </div>
  );
}

export default App;
