import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import MobileForm from "../components/mobile/MobileForm";

function RegisterProfile() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [firedepartments, setFiredepartments] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fflernapp.hansehart.de/api/service/receive/firedepartments")
      .then((response) => response.json())
      .then((data: { locationNumber: string[], name: string }[]) => {
        const fd = data.map((item) => `${item.name} (${item.locationNumber})`);
        setFiredepartments(fd);
      });
  }, []);

  function register() {
    const username = document.getElementById("input-0") as HTMLInputElement;
    const fd = document.getElementById("input-1") as HTMLInputElement;
    const fdKey = fd.value.trim();
    
    // split the value into name and number parts
    const match = fdKey.match(/^(.*?) \((\d+)\)$/);

    var fdName =  "";
    var fdLocationNumber = "";
    
    if (match) { 
      fdName = match[1];
      fdLocationNumber = match[2];
    } else {
      console.error("ERROR: problems with profile creation");
    }


    // create an object to store input values
    const formData: { [key: string]: string } = {};
    formData["username"] = username.value;
    formData["firedepatmentName"] = fdName;
    formData["firedepartmentLocationNumber"] = fdLocationNumber;
    const jsonData = JSON.stringify(formData);
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
      selectOptions: firedepartments,
    },
    { value: "Bestätigen", type: "button", function: register },
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
