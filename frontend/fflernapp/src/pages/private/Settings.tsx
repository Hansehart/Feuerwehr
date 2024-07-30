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
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
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

  function saveChanges() {
    const inputFields = document.querySelectorAll("input");
    if (editUsername) { // username has to be updated
      const username = inputFields[0].value
      // create an object to store input values
      let formData: { [key: string]: string } = {};
      formData["attribute"] = "username";
      formData["value"] = username;
      let jsonData = JSON.stringify(formData);

      fetch("https://fflernapp.hansehart.de/api/service/update/user", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      }).then((response) => {
        if (response.ok) {
        }
      });
    }
    if (editPassword) { // password has to be updated
      const newPassword = inputFields[1].value;
      const newRepeatedPassword = inputFields[2].value;
      const currentPassword = inputFields[3].value;

      console.log(newPassword, newRepeatedPassword, currentPassword)
    }
  }

  const fields = [
    ...(!editMode
      ? [
          // edit mode off
          {
            label: "Dein Nutzername",
            type: "text",
            placeholder: username,
            disabled: true,
          },
          {
            label: "Aktuelles Passwort",
            type: "password",
            placeholder: "*********",
            disabled: true,
          },
          {
            value: "Bearbeiten",
            type: "button",
            onClick: () => {
              setEditMode(true);
            },
          },
        ]
      : [
          // edit mode on
          {
            label: "Neuer Nutzername",
            type: "text",
            onClick: () => {
              setEditUsername(true);
            }
          },
          ...(!editPassword
            ? [
                // and edit password off
                {
                  label: "Neues Passwort",
                  type: "password",
                  onClick: () => {
                    setEditPassword(true);
                  },
                },
              ]
            : [
                // and edit password on
                {
                  label: "Neues Passwort",
                  type: "password",
                },
                {
                  label: "Neues Passwort wiederholen",
                  type: "password",
                },
                {
                  label: "aktuelles Passwort",
                  type: "password",
                },
              ]),
          // buttons for edit mode on and for both password modes
          {
            value: "Abbrechen",
            type: "button",
            onClick: () => {
              setEditMode(false);
              setEditUsername(false)
              setEditPassword(false);
            },
          },
          {
            value: "Speichern",
            type: "button",
            onClick: () => saveChanges(),
          },
        ]),
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

export default Settings;
