import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";

function Contact() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  const options = [
    "Fehler mitteilen",
    "Kontaktaufnahme",
    "Presseanfrage",
    "Sonstiges",
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

  function send() {
    const selectedReason = document.getElementById(
      "input-0"
    ) as HTMLInputElement;
    const email = document.getElementById("input-1") as HTMLInputElement;
    const message = document.getElementById("input-2") as HTMLInputElement;

    // create an object to store input values
    const payload: { [key: string]: string } = {};

    payload["reason"] = selectedReason.value.trim();
    payload["email"] = email.value;
    payload["question"] = message.value;
    const jsonData = JSON.stringify(payload);
    fetch("https://feuerwehr.hansehart.de/api/service/save/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((response) => {
      if (response.ok) {
        navigate("/home");
      }
    });
  }

  const fields = [
    {
      label: "Grund auswählen",
      type: "select",
      selectOptions: options,
    },
    {
      label: "E-Mail",
      type: "email",
    },
    {
      label: "Deine Nachricht an uns",
      className: "mt-8",
      type: "textarea",
    },
    { value: "Senden", type: "button", onClick: send },
  ];

  return (
    <div>
      <MobileHeader name="Kontakt" />
      <MobileBody
        main={<MobileForm background={true} fields={fields} />}
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Contact;
