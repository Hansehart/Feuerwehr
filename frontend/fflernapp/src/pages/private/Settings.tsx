import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";

function Settings() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");

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

    fetch("https://fflernapp.hansehart.de/api/service/receive/user?attr=name")
      .then((response) => response.json())
      .then((data) => setUsername(data.content));
  }, [select]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  function edit() {
    setEditMode(true);
    const disabledButtons = document.querySelectorAll("input:disabled");
  
  // iterate over each disabled button and enable them
  disabledButtons.forEach((element) => {
    const input = element as HTMLButtonElement;
    input.disabled = false; // Enable the button
  });
  }

  const fields = [
    {
      label: "Dein Nutzername",
      type: "text",
      value: username,
      disabled: true,
    },
    {
      label: "Passwort",
      type: "password",
      value: "12345678",
      disabled: true,
    },

    { value: "Bearbeiten", type: "button", onClick: edit },
  ];

  return (
    <div>
      <MobileHeader name="Einstellungen" />
      <MobileBody main={<MobileForm background={true} fields={fields} />} />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Settings;
