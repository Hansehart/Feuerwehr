import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
