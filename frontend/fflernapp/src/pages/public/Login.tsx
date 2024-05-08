import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileForm from "../../components/mobile/MobileForm";

function Login({
  updateAuthStatus,
}: {
  updateAuthStatus: (auth: boolean) => void;
}) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  function login() {
    const inputFields = document.querySelectorAll("input");

    const formData: { [key: string]: string } = {};
    formData["email"] = inputFields[0].value;
    formData["password"] = inputFields[1].value;
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
    },
    { value: "Anmelden", type: "button", function: login },
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
