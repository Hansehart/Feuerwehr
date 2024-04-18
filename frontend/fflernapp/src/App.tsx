import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";
import Exercise from "./pages/Exercise";
import Regulations from "./pages/Regulations";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/learn/exercise" element={<Exercise />} />
        <Route path="/learn/regulations" element={<Regulations />} />
        <Route path="/learn/courses" element={<Courses />} />
        <Route path="/vehicle/view" element={<Vehicle />} />
        <Route path="/profile/register" element={<Register />} />
        <Route path="/profile/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
