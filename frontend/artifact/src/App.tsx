import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import PublicHome from "./pages/public/Home";
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
import Imprint from "./pages/public/Imprint";
import Privacy from "./pages/public/Privacy";
import GTC from "./pages/public/GTC";
import License from "./pages/public/License";
import QuestionBot from "./pages/public/QuestionBot";

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
            <Route path="/main/vehicle" element={<Vehicle />} />
            <Route
              path="/profile/settings"
              element={<Directory type="/profile/settings" navbar="profile" title="Einstellungen"/>}
            />
            <Route path="/profile/settings/data" element={<Construction />} />
            <Route
              path="/profile/settings/password"
              element={<EditPassword />}
            />
            <Route
              path="/profile/register/profile"
              element={<RegisterProfile />}
            />
            <Route
              path="/profile/info"
              element={<Directory type="/info" navbar="department" title="Infopoint"/>}
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
        <Route
          path="/info"
          element={<Directory type="/info" navbar="department" title="Infopoint"/>}
        />
        <Route path="/info/contact" element={<Contact />} />
        <Route path="/info/gtc" element={<GTC />} />
        <Route path="/info/imprint" element={<Imprint />} />
        <Route path="/info/map" element={<Construction />} />
        <Route path="/info/licenses" element={<License />} />
        <Route path="/info/privacy" element={<Privacy />} />
        
        <Route path="/learn/courses" element={<Construction />} />
        <Route
          path="/learn/exercises"
          element={<Directory type="/learn/exercises" navbar="learn" title="Übung"/>}
        />
        <Route path="/learn/exercises/train" element={<Exercise />} />
        <Route
          path="/learn/book"
          element={<Directory type="/learn/book" navbar="learn" title="Handbuch" />}
        />
        <Route
          path="/learn/book/vehicles"
          element={<Directory type="/learn/book/vehicles" navbar="learn" title="Fahrzeuge"/>}
        />
        <Route
          path="/learn/book/regulations"
          element={<Directory type="/learn/book/regulations" navbar="learn" title="Vorschriften"/>}
        />
        <Route path="/learn/book/regulations/fwdv" element={<Construction />} />
        <Route path="/learn/book/vehicles/lf" element={<Construction />} />
        <Route path="/learn/question" element={<QuestionBot />} />

        <Route path="/start" element={<Start />} />
        <Route path="*" element={<Navigate replace to="/start" />} />
      </Routes>
    </Router>
  );
}

export default App;
