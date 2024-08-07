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

  function saveChanges() {
    // pull all fields
    const inputFields = document.querySelectorAll("input");
    const currentPassword = inputFields[0].value;
    const newPassword = inputFields[1].value;
    const newRepeatedPassword = inputFields[2].value;

    // check if password fits
    if (newPassword === newRepeatedPassword) {
      // pull email for user
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

          // authenticate with e-mail
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
                  // success
                } else {
                  // error message
                }});
            }
          });
        });
    }
  }

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
