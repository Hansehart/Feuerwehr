import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import Notificator from "../../components/general/Notficator";

interface Firedepartment {
  id: number;
  name: string;
  locationNumber: string;
}

function RegisterProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [firedepartments, setFiredepartments] = useState<Firedepartment[]>([]);

  const { state } = location;

  useEffect(() => {
    fetch("https://feuerwehr.hansehart.de/api/service/receive/firedepartments")
      .then((response) => response.json())
      .then((data: Firedepartment[]) => {
        // direct type casting to Firedepartment[]
        setFiredepartments(data);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // remove the notification
      const notificator = document.getElementById("notificator-window");
      if (notificator) {
        // if the element was found
        notificator.style.display = "none";
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // cleanup the timer if the component unmounts
  }, []);

  function register() {
    const username = document.getElementById("input-0") as HTMLInputElement;
    const element = document.getElementById("input-1") as HTMLInputElement;
    const selectedFd = element.value.trim();

    // split the value into name and number parts
    const match = selectedFd.match(/^(.*?) \((\d+)\)$/);

    var fdName = "";
    var fdLocationNumber = "";

    if (match) {
      fdName = match[1];
      fdLocationNumber = match[2];
    } else {
      console.error("ERROR: problems with profile creation");
      return;
    }

    // create an object to store input values
    const payload: { [key: string]: string | number } = {};
    const target = firedepartments.find(
      (fd) => fd.name === fdName && fd.locationNumber === fdLocationNumber
    );
    if (!target) {
      console.error("ERROR: problems with profile creation");
      return;
    }
    payload["fid"] = target.id;
    payload["username"] = username.value;
    const jsonData = JSON.stringify(payload);
    fetch("https://feuerwehr.hansehart.de/api/service/save/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((response) => {
      if (response.ok) {
        navigate("/home", { state: { select:"department", notfication: "Profil erfolgreich erstellt!" } });
      }
    });
  }

  function skip() {
    navigate("/home", { state: { select: "department" } });  }

  const fields = [
    {
      label: "Dein Nutzername",
      type: "text",
    },
    {
      label: "Feuerwehr auswählen",
      type: "select",
      selectOptions: firedepartments.map(
        (fd) => fd.name + " (" + fd.locationNumber + ")"
      ),
    },
    {
      value: "Bestätigen",
      classname: "mt-8",
      type: "button",
      onClick: register,
    },
    {
      value: "Überspringen",
      classname: "!border-solid !bg-transparent !border-4 !border-secondary",
      type: "button",
      onClick: skip,
    },
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
      {state && state.notification && (
        <Notificator type="success" text={state.notification} />
      )}
      <MobileHeader name="Registrieren" />
      <MobileBody
        main={<MobileForm background={true} fields={fields} />}
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default RegisterProfile;
