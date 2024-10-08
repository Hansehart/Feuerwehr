import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

function EditPassword() {
  const navigate = useNavigate();
  const { changeView } = useNavbar();

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
        "https://feuerwehr.hansehart.de/api/service/receive/user?attr=email"
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
          fetch("https://feuerwehr.hansehart.de/api/service/login", {
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
                "https://feuerwehr.hansehart.de/api/service/update/user",
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
                  navigate("/home", { state: { select: "department", notification: {type: "success", message: "Passwort geändert!"}}});
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
      label: "Aktuelles Passwort",
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
      value: "Speichern",
      classname: "mt-8",
      type: "button",
      onClick: () => saveChanges(),
    },
    {
      value: "Abbrechen",
      classname: "!border-solid !bg-transparent !border-4 !border-secondary",
      type: "button",
      onClick: () => {
        navigate("/profile/settings");
      },
    }
  ];

  return (
    <div>
      <MobileHeader name="Einstellungen" link="/profile/settings" />
      <MobileBody
        fullscreen={
          <MobileForm identifier="settings" background={true} fields={fields} />
        }
      />
      <MobileNavBar changeView={changeView} preset="profile" />
      <MobileInfoFooter />
    </div>
  );
}

export default EditPassword;
