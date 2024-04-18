import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../components/mobile/MobileBody";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavBar from "../components/mobile/MobileNavBar";
import MobileForm from "../components/mobile/MobileForm";

function Login() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  const fields = [
    {
      label: "E-Mail",
      type: "email",
    },
    {
      label: "Passwort",
      type: "password",
    }
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
      <MobileHeader name="Login" />
      <MobileBody
        main={
          <MobileForm
            background={true}
            fields={fields}
            submit="anmmelden"
          />
        }
        marginToFooter="15vh"
      />
      <MobileNavBar changeView={changeView} preset="profile" />
    </div>
  );
}

export default Login;
