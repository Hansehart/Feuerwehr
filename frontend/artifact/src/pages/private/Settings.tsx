import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";

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

    fetch("https://feuerwehr.hansehart.de/api/service/receive/user?attr=name")
      .then((response) => response.json())
      .then((data) => setUsername(data.content));
  }, [select]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  function saveChanges() {
    const inputFields = document.querySelectorAll("input");
    const username = inputFields[0].value;
    if (editUsername && username.length > 0) {
      // username has to be updated
      // create an object to store input values
      let formData: { [key: string]: string } = {};
      formData["attribute"] = "username";
      formData["value"] = username;
      let jsonData = JSON.stringify(formData);

      fetch("https://feuerwehr.hansehart.de/api/service/update/user", {
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
    if (editPassword) {
      // password has to be updated
      const newPassword = inputFields[1].value;
      const newRepeatedPassword = inputFields[2].value;
      const currentPassword = inputFields[3].value;

      if (newPassword === newRepeatedPassword) {
        // autheticate
        fetch(
          "https://fflernapp.hansehart.de/api/service/receive/user?attr=email"
        )
          .then((response) => response.json())
          .then((data) => {
            const email = data.content;
            let formData = {
              email: email,
              password: currentPassword,
            };
            let jsonData = JSON.stringify(formData);
            fetch("https://fflernapp.hansehart.de/api/service/login", {
              credentials: "include",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: jsonData,
            }).then((response) => {
              if (response.ok) {
                // change password due to successfull authentication
                let formData: { [key: string]: string } = {};
                formData["attribute"] = "password";
                formData["value"] = newPassword;
                let jsonData = JSON.stringify(formData);

                fetch(
                  "https://fflernapp.hansehart.de/api/service/update/user",
                  {
                    credentials: "include",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: jsonData,
                  }
                ).then((response) => {
                  if (response.ok) {
                  }
                });
              } else {
                // show notfication wrong password
              }
            });
          });
      } else {
        // show notfication error
      }
    }

    // remove edit options after saving
    setEditMode(false);
    setEditUsername(false);
    setEditPassword(false);
  }

  const preview = [
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
      onClick: () => setEditMode(true),
    },
  ];

  const editUsernameFields = [
    {
      label: "Neuer Nutzername",
      type: "text",
      onClick: () => setEditUsername(true),
    },
  ];

  const editPasswordPreview = [
    {
      label: "Neues Passwort",
      type: "password",
      onClick: () => setEditPassword(true),
    },
  ];

  const editPasswordFields = [
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
  ];

  const editButtons = [
    {
      value: "Abbrechen",
      type: "button",
      onClick: () => {
        setEditMode(false);
        setEditUsername(false);
        setEditPassword(false);
      },
    },
    {
      value: "Speichern",
      type: "button",
      onClick: () => saveChanges(),
    },
  ];

  const fields = !editMode
    ? preview 
    : [
        ...editUsernameFields,
        ...(editPassword ? editPasswordFields : editPasswordPreview),
        ...editButtons,
      ];

  return (
    <div>
      <MobileHeader name="Einstellungen" link="/profile/settings"/>
      <MobileBody
        main={
          <MobileForm identifier="settings" background={true} fields={fields} />
        }
      />
      <MobileNavBar changeView={changeView} preset="profile" />
      <MobileInfoFooter />
    </div>
  );
}

export default Settings;
