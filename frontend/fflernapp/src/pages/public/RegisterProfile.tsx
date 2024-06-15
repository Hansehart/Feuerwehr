import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/MobileBody";
import MobileHeader from "../../components/mobile/MobileHeader";
import MobileNavBar from "../../components/mobile/MobileNavBar";
import MobileForm from "../../components/mobile/MobileForm";
import Notficator from "../../components/general/Notficator";

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
    fetch("https://fflernapp.hansehart.de/api/service/receive/firedepartments")
      .then((response) => response.json())
      .then((data: Firedepartment[]) => {
        // direct type casting to Firedepartment[]
        setFiredepartments(data);
      });
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
    fetch("https://fflernapp.hansehart.de/api/service/save/profile", {
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
      label: "Name",
      type: "name",
    },
    {
      label: "Feuerwehr auswählen",
      type: "select",
      selectOptions: firedepartments.map(
        (fd) => fd.name + " (" + fd.locationNumber + ")"
      ),
    },
    { value: "Bestätigen", type: "button", onClick: register },
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
      {state && state.notfication && <Notficator text={state.notfication}/>}
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
