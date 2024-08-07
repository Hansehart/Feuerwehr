import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";

function EditPassword() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

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

  function saveChanges() {}

  const fields = [
    {
      label: "aktuelles Passwort",
      type: "password",
    },
    {
      label: "Neues Passwort",
      type: "password",
    },
    {
      label: "Neues Passwort wiederholen",
      type: "password",
    },
    {
      value: "Abbrechen",
      type: "button",
      onClick: () => {
        navigate("/home");
      },
    },

    {
      value: "Speichern",
      type: "button",
      onClick: () => saveChanges(),
    },
  ];

  return (
    <div>
      <MobileHeader name="Einstellungen" />
      <MobileBody
        main={
          <MobileForm identifier="settings" background={true} fields={fields} />
        }
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default EditPassword;
