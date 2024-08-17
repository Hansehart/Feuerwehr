import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import PublicHome from "./pages/public/Home";
import Map from "./pages/public/Map";
import Exercise from "./pages/public/Exercise";
import RegisterAccount from "./pages/public/RegisterAccount";
import RegisterProfile from "./pages/private/RegisterProfile";
import Login from "./pages/public/Login";
import Logout from "./pages/private/Logout";
import Vehicle from "./pages/private/Vehicle";
import Home from "./pages/private/Home";
import Contact from "./pages/public/Contact";
import Start from "./pages/public/Start";
import EditPassword from "./pages/private/EditPassword";
import Directory from "./pages/public/Directory";
import Construction from "./pages/public/Construction";

function App() {
  const [auth, setAuth] = useState<boolean>(false);

  // on render set auth status
  useEffect(() => {
    fetch("https://feuerwehr.hansehart.de/api/service/auth")
      .then((response) => response.json())
      .then((data) => {
        setAuth(data.content);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {auth ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/main/vehicle/:rvt/:rvn" element={<Vehicle />} />
            <Route
              path="/profile/settings"
              element={<Directory type="/profile/settings" navbar="profile" />}
            />
            <Route
              path="/profile/settings/data"
              element={<Construction />}
            />
            <Route
              path="/profile/settings/password"
              element={<EditPassword />}
            />
            <Route
              path="/profile/register/profile"
              element={<RegisterProfile />}
            />
            <Route
              path="/profile/logout"
              element={<Logout updateAuthStatus={setAuth} />}
            />
          </>
        ) : (
          <>
            <Route path="/home" element={<PublicHome />} />
            <Route
              path="/profile/register/account"
              element={<RegisterAccount updateAuthStatus={setAuth} />}
            />
            <Route
              path="/profile/login"
              element={<Login updateAuthStatus={setAuth} />}
            />
          </>
        )}
        <Route path="/start" element={<Start />} />
        <Route path="/info/map" element={<Construction />} />
        <Route path="/info/gtc" element={<Construction />} />
        <Route path="/info/imprint" element={<Construction />} />
        <Route path="/info/contact" element={<Contact />} />

        <Route path="/learn/exercises" element={<Exercise />} />
        <Route path="/learn/regulations" element={<Construction />} />
        <Route path="/learn/courses" element={<Construction />} />

        <Route path="/dev/info/map" element={<Map />} />

        <Route path="*" element={<Navigate replace to="/start" />} />
      </Routes>
    </Router>
  );
}

export default App;
