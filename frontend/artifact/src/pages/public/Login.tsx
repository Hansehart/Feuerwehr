import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import Notificator from "../../components/general/Notficator";
import MobileImprintFooter from "../../components/mobile/basics/MobileInfoFooter";

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

    fetch("https://feuerwehr.hansehart.de/api/service/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((response) => {
      if (response.ok) {
        // authenticate the user
        fetch("https://feuerwehr.hansehart.de/api/service/auth")
          .then((response) => response.json())
          .then((data) => {
            updateAuthStatus(data.content);
            navigate("/home", { state: { select: "department" } });
          });
      } else if (response.status === 400) {
        // unknown account
        setNotification({
          type: "error",
          message: "E-Mail oder Passwort fehlerhaft!",
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
    { value: "Anmelden", classname: "mt-8", type: "button", onClick: login },
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
      <MobileBody main={<MobileForm background={true} fields={fields} />} />
      <MobileNavBar changeView={changeView} preset="profile" />
      <MobileImprintFooter />
    </div>
  );
}

export default Login;
