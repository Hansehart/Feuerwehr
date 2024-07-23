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
  const [editPassword, setEditPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [inputFields, setInputFields] =
    useState<NodeListOf<HTMLInputElement>>();

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

  useEffect(() => {
    setInputFields(document.querySelectorAll("input"));
  }, [editPassword]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  function saveChanges() {
    if (inputFields) {
      // save new username
      const username = inputFields[0].value;

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

      // save new password
      //const oldPassword = inputFields[1].value;
      const newPassword = inputFields[2].value;
      const newPasswordRepeated = inputFields[3].value;

      console.log(newPassword === newPasswordRepeated)
      console.log(newPassword + ":" + newPasswordRepeated)
      if (newPassword === newPasswordRepeated ) {
        formData["attribute"] = "password";
        formData["value"] = newPassword;
        jsonData = JSON.stringify(formData);
  
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
      setEditMode(false);
      setEditPassword(false);
    }
  }

  const fields = [
    {
      label: "Dein Nutzername",
      type: "text",
      placeholder: username,
      disabled: !editMode,
    },
    {
      label: "Aktuelles Passwort",
      type: "password",
      disabled: !editMode,
      onFocus: () => setEditPassword(true),
    },
    ...(editPassword && editMode
      ? [
          {
            label: "Neues Passwort",
            type: "password",
          },
          {
            label: "Wiederholen",
            type: "password",
          },
        ]
      : []),
    ...(editMode
      ? [
          {
            value: "Abbrechen",
            type: "button",
            onClick: () => {
              setEditMode(false);
              setEditPassword(false);
            },
          },
          {
            value: "Speichern",
            type: "button",
            onClick: () => saveChanges(),
          },
        ]
      : [
          {
            value: "Bearbeiten",
            type: "button",
            onClick: () => {
              setEditMode(true);
            },
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
