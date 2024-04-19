import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import MobileForm from "../components/mobile/MobileForm";

function Register() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  function register() {
    // Prevent the default form submission behavior
    const inputFields = document.querySelectorAll("input");

    // create an object to store input values
    const formData: { [key: string]: string } = {};
    formData["email"] = inputFields[0].value;
    formData["password"] = inputFields[1].value;
    const jsonData = JSON.stringify(formData);
    fetch("https://fflernapp.hansehart.de/api/service/save/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
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
    {
      label: "Passwort wiederholen",
      type: "password",
    },
    { value: "Bestätigen", type: "submit", function: register },
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

export default Register;
