import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import MobileForm from "../components/mobile/MobileForm";

function Register() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  function collectFormData() {
    const inputFields = document.querySelectorAll("input");

    // create an object to store input values
    const formData: { [key: string]: string } = {};
    // iterate through input fields and store their values in the formData object
    inputFields.forEach((input) => {
      formData[input.id] = input.value;
    });
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    fetch("https://fflernapp.hansehart.de/api/service/receive/user", {
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
    { value: "Bestätigen", type: "submit", function: collectFormData },
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
