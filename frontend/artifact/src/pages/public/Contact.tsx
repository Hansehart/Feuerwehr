import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileForm from "../../components/mobile/basics/MobileForm";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import Notificator from "../../components/general/Notficator";
import { useNavbar } from "../../hooks/useNavbar";

interface NotficatorProps {
  type: "success" | "warning" | "error";
  message: string;
}

function Contact() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<NotficatorProps | null>(
    null
  );

  const options = [
    "Datenschutz",
    "Fehler mitteilen",
    "Kontaktaufnahme",
    "Presseanfrage",
    "Sonstiges",
  ];

  const { changeView } = useNavbar();


  useEffect(() => {
    if (notification) {
      // Notification will automatically trigger a re-render when setNotification is called
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Clear the notification after 3 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or notification change
    }
  }, [notification]);

  function send() {
    const selectedReason = document.getElementById(
      "input-0"
    ) as HTMLInputElement;
    const email = document.getElementById("input-1") as HTMLInputElement;
    const message = document.getElementById("input-2") as HTMLInputElement;

    // Function to check if an email is valid
    const isEmailValid = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmailValid(email.value)) {
      setNotification({
        type: "error",
        message: "E-Mail ungültig!",
      });
      return;
    }

    const payload: { [key: string]: string } = {
      reason: selectedReason.value.trim(),
      email: email.value,
      question: message.value,
    };

    fetch("https://feuerwehr.hansehart.de/api/service/save/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.ok) {
        navigate("/home", {
          state: {
            notification: {
              type: "success",
              message: "Nachricht erfolgreich versendet",
            },
          },
        });
      } else {
        setNotification({
          type: "error",
          message: "Fehler beim Senden der Nachricht!",
        });
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
      label: "Deine E-Mail",
      type: "email",
    },
    {
      label: "Deine Nachricht an uns",
      type: "textarea",
    },
    { value: "Senden", classname: "mt-8", type: "button", onClick: send },
  ];

  return (
    <div>
      <MobileHeader name="Kontakt" link="/info" />
      {notification && (
        <Notificator
          type={notification.type}
          text={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <MobileBody fullscreen={<MobileForm background={true} fields={fields} />} />
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
}

export default Contact;
