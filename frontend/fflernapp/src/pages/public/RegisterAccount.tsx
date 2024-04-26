import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileForm from "../../components/mobile/MobileForm";

function RegisterAccount({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  function register() {
    // prevent the default form submission behavior
    const inputFields = document.querySelectorAll("input");

    // create an object to store input values
    const formData: { [key: string]: string } = {};
    formData["email"] = inputFields[0].value;
    formData["password"] = inputFields[1].value;
    const jsonData = JSON.stringify(formData);
    fetch("https://fflernapp.hansehart.de/api/service/save/account", {
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
            navigate("/profile/register/profile");
          });
      }
    });
  }

  const fields = [
    {
      label: "E-Mail",
      type: "text",
    },
    {
      label: "Passwort",
      type: "password",
    },
    {
      label: "Passwort wiederholen",
      type: "password",
    },
    {
      label: "Ich akzeptiere die AGB",
      type: "checkbox",
      inline: true,
      reverse: true,
    },

    { value: "Bestätigen", type: "button", function: register },
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
      <MobileHeader name="Registrieren" />
      <MobileBody
        main={<MobileForm background={true} fields={fields} />}
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default RegisterAccount;
