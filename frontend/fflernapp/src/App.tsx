import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicHome from "./pages/public/Home";
import Map from "./pages/public/Map";
import Exercise from "./pages/public/Exercise";
import Regulations from "./pages/public/Regulations";
import Courses from "./pages/public/Courses";
import RegisterAccount from "./pages/public/RegisterAccount";
import RegisterProfile from "./pages/public/RegisterProfile";
import Login from "./pages/public/Login";

import Vehicle from "./pages/private/Vehicle";
import Home from "./pages/private/Home";
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState<boolean>(false);

  // on render set auth status
  useEffect(() => {
    fetch("https://fflernapp.hansehart.de/api/service/auth")
      .then((response) => response.json())
      .then((data) => {
        setAuth(data.msg);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {auth ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/main/vehicle" element={<Vehicle />} />
            <Route
              path="/profile/register/profile"
              element={<RegisterProfile />}
            />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<PublicHome />} />
            <Route
              path="/profile/register/account"
              element={<RegisterAccount updateAuthStatus={setAuth} />}
            />
            <Route path="/profile/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </>
        )}
        <Route path="/learn/exercises" element={<Exercise />} />
        <Route path="/learn/regulations" element={<Regulations />} />
        <Route path="/learn/courses" element={<Courses />} />
        <Route path="/main/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
