import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import Notificator from "../../components/general/Notficator";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

interface NotificatorProps {
  type: "success" | "warning" | "error";
  message: string;
}

function Login({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<NotificatorProps | null>(null);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const login = useCallback(() => {
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
            setNotification({
              type: "success",
              message: "Erfolgreich angemeldet!",
            });
            setTimeout(() => {
              navigate("/home", { state: { select: "department" } });
            }, 3000); // Navigate after notification is shown
          });
      } else if (response.status === 400) {
        // unknown account
        setNotification({
          type: "error",
          message: "E-Mail oder Passwort fehlerhaft!",
        });
      }
    });
  }, [email, password, navigate, updateAuthStatus]);

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
    { 
      value: "Anmelden", 
      classname: "mt-8", 
      type: "button", 
      onClick: () => {
        clearNotification(); // Clear existing notification before attempting new login
        login();
      }
    },
  ];

  const { changeView } = useNavbar();

  return (
    <div>
      {notification && (
        <Notificator
          type={notification.type}
          text={notification.message}
          onClose={clearNotification}
        />
      )}
      <MobileHeader name="Login" link="/profile/login"/>
      <MobileBody fullscreen={<MobileForm background={true} fields={fields} />} />
      <MobileNavBar changeView={changeView} preset="profile" />
      <MobileInfoFooter />
    </div>
  );
}

export default Login;