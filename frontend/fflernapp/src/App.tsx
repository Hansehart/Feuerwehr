import MobileBody from "./components/mobile/MobileBody";
import MobileHeader from "./components/mobile/MobileHeader";
import MobileNavBar from "./components/mobile/MobileNavBar";

function App() {
  return (
    <div>
      <MobileHeader name="Mollhagen" />
      <MobileBody />
      <MobileNavBar />
    </div>
  );
}

export default App;
