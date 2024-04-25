import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/public/Home";
import Vehicle from "./pages/public/Vehicle";
import Exercise from "./pages/public/Exercise";
import Regulations from "./pages/public/Regulations";
import Courses from "./pages/public/Courses";
import RegisterAccount from "./pages/public/RegisterAccount";
import RegisterProfile from "./pages/public/RegisterProfile";
import Login from "./pages/public/Login";
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("https://fflernapp.hansehart.de/api/service/auth")
      .then((response) => response.json())
      .then((data) => {
        setAuth(data.msg);
      });
  }, []);

  return (
    <Router>
      {auth ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/learn/exercise" element={<Exercise />} />
          <Route path="/learn/regulations" element={<Regulations />} />
          <Route path="/learn/courses" element={<Courses />} />
          <Route path="/vehicle/view" element={<Vehicle />} />
          <Route
            path="/profile/register/account"
            element={<RegisterAccount />}
          />
          <Route
            path="/profile/register/profile"
            element={<RegisterProfile />}
          />
          <Route path="/profile/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
