import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import LoadingCircle from "../../components/general/LoadingCircle";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function Logout({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const { changeView } = useNavbar();


  fetch("https://feuerwehr.hansehart.de/api/service/logout", {
    credentials: "include",
    method: "GET",
  }).then(() => {
    updateAuthStatus(false);
    navigate("/home", {
      state: { notification: {type: "success", message: "Erfolgreich abgemeldet!"} },
    });
  });

  return (
    <div>
      <MobileHeader name="Logout" link="/home"/>
      <div style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <MobileBody
        main={<LoadingCircle />}
        after={<p>Bitte warten Sie einen Moment.</p>}
      />
      </div>
      <MobileNavBar changeView={changeView} preset="profile" />
      <MobileInfoFooter />
    </div>
  );
}

export default Logout;
