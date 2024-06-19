import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileForm from "../../components/mobile/MobileForm";
import Notificator from "../../components/general/Notficator";

interface NotficatorProps {
  type: string;
  message: string;
}

function Login({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<NotficatorProps | null>(
    null
  );

  function login() {
    const formData = {
      email: email,
      password: password,
    };
    const jsonData = JSON.stringify(formData);

    fetch("https://fflernapp.hansehart.de/api/service/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((response) => {
      if (response.ok) {
        // authenticate the user
        fetch("https://fflernapp.hansehart.de/api/service/auth")
          .then((response) => response.json())
          .then((data) => {
            updateAuthStatus(data.msg);
            navigate("/home");
          });
      } else if (response.status === 400) {
        // unknown account
        setNotification({
          type: "error",
          message: "E-Mail oder Passwort fehlerhaft",
        });
      }
    });
  }

  const fields = [
    {
      label: "E-Mail",
      type: "email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      label: "Passwort",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
    { value: "Anmelden", type: "button", onClick: login },
  ];

  useEffect(() => {
    switch (select) {
      case "learn":
        navigate("/home", { state: { select: "learn" } });
        break;
      case "department":
        navigate("/home", { state: { select: "department" } });
        break;
      case "profile":
        navigate("/home", { state: { select: "profile" } });
        break;
    }
  }, [select]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  return (
    <div>
      {notification && (
        <Notificator type={notification.type} text={notification.message} />
      )}
      <MobileHeader name="Login" />
      <MobileBody
        main={<MobileForm background={true} fields={fields} />}
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Login;
