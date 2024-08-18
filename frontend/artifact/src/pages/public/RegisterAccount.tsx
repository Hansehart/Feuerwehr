import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import Notificator from "../../components/general/Notficator";

interface NotficatorProps {
  type: string;
  message: string;
}

function RegisterAccount({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [notification, setNotification] = useState<NotficatorProps | null>(
    null
  );

  function register() {
    const inputFields = document.querySelectorAll("input");

    const email = inputFields[0].value;
    const pw = inputFields[1].value;
    const repeatedPw = inputFields[2].value;
    const checkbox = inputFields[3].checked;

    // Function to check if an email is valid
    const isEmailValid = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // check if passwords are equal
    if (!isEmailValid(email)) {
      setNotification({
        type: "error",
        message: "E-Mail Format ungültig!",
      });
      return;
    } else if (pw !== repeatedPw) {
      // passwords different
      setNotification({
        type: "error",
        message: "Passwort stimmt nicht überein!",
      });
      return;
    } else if (pw.length === 0 || repeatedPw.length === 0) {
      // passwords empty
      setNotification({
        type: "error",
        message: "Passwort darf nicht leer sein!",
      });
      return;
    } else if (!checkbox) {
      // gtc not accepted
      setNotification({
        type: "error",
        message: "Stimme bitt den AGB zu!",
      });
      return;
    }

    // create an object to store input values
    const formData: { [key: string]: string } = {};
    formData["email"] = email;
    formData["password"] = pw;
    const jsonData = JSON.stringify(formData);
    fetch("https://feuerwehr.hansehart.de/api/service/save/account", {
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
            navigate("/profile/register/profile", {
              state: { notification: "Account wurde erstellt!" },
            });
          });
      } else if (response.status === 400) {
        // e-mail already taken
        setNotification({
          type: "error",
          message: "E-Mail bereits vergeben!",
        });
      }
    });
  }

  const fields = [
    {
      label: "E-Mail",
      type: "email",
    },
    {
      label: "Passwort",
      type: "password",
      passwordValidator: true,
    },
    {
      label: "Passwort wiederholen",
      type: "password",
    },
    {
      label: (
        <>
          Ich akzeptiere die{" "}
          <a href="https://feuerwehr.hansehart.de/info/gtc" target="_blank">
            AGB
          </a>
        </>
      ),
      type: "checkbox",
      classname: "w-6 h-6",
      inline: true,
      reverse: true,
    },

    {
      value: "Bestätigen",
      classname: "mt-4 mb-8",
      type: "button",
      onClick: register,
    },
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
      <MobileHeader name="Registrieren" />
      <MobileBody
        main={<MobileForm background={true} fields={fields} classname="mt-8" />}
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default RegisterAccount;
