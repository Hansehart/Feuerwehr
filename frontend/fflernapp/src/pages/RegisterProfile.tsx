import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import MobileForm from "../components/mobile/MobileForm";

function RegisterProfile() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [firedepartments, setFiredepartments] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fflernapp.hansehart.de/api/service/receive/firedepartments?attr=name")
      .then((response) => response.json())
      .then((data: { msg: string }[]) => {
        const names = data.map((item) => item.msg);
        setFiredepartments(names);
      });
  }, []);

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
    }).then((response) => {
      if (response.ok) {
        navigate("/profile/register/account");
      }
    });
  }

  const fields = [
    {
      label: "Name",
      type: "name",
    },
    {
      label: "Feuerwehr auswählen",
      type: "select",
      selectOptions: firedepartments,
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

export default RegisterProfile;
