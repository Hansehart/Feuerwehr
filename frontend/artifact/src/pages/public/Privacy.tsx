import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";

const PrivacyContent = () => {
  return (
    <div className="w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Datenschutzerklärung</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Verantwortlicher</h2>
            <p className="text-gray-700">
              Richard Hartung<br />
              Dünenweg 25<br />
              21033 Hamburg<br />
              E-Mail: feuerwehr@hansehart.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Art der erhobenen Daten</h2>
            <p className="text-gray-700">
              Bei der Registrierung erheben wir folgende personenbezogene Daten:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>E-Mail-Adresse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Zweck der Datenverarbeitung</h2>
            <p className="text-gray-700">
              Die E-Mail-Adresse wird für folgende Zwecke verwendet:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Zur Erstellung und Verwaltung des Benutzerkontos</li>
              <li>Zur Kommunikation bezüglich des Kontos und ausgewählter Dienstleistungen</li>
              <li>Zur Zusendung wichtiger Informationen und Benachrichtigungen</li>
              <li>Zur Beantwortung von Anfragen, wenn das Kontaktformular genutzt wird</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rechtsgrundlage</h2>
            <p className="text-gray-700">
              Die Verarbeitung der E-Mail-Adresse erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Erfüllung des Vertragsverhältnisses zwischen uns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Dauer der Speicherung</h2>
            <p className="text-gray-700">
              Wir speichern die E-Mail-Adresse für die Dauer der Mitgliedschaft. Nach Beendigung des Kontos werden die Daten gelöscht, es sei denn, gesetzliche Aufbewahrungsfristen erfordern eine längere Speicherung.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Ihre Rechte</h2>
            <p className="text-gray-700">
              Es gelten folgende Rechte bezüglich der personenbezogenen Daten:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Widerspruchsrecht</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Zur Ausübung der Rechte kontaktiere nutze das Kontaktformular oder die E-Mail des oben genannten Verantwortlichen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Beschwerderecht</h2>
            <p className="text-gray-700">
              Es besteht das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung der personenbezogenen Daten durch uns zu beschweren.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Änderungen der Datenschutzerklärung</h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Die aktuelle Version befindet sich setets auf unserer Website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

function Privacy() {
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
  }, [select, navigate]);

  const changeView = (view: string) => {
    setSelect(view);
  };

  return (
    <div>
      <MobileHeader name="Infopoint" link="/info" />
      <MobileBody main={<PrivacyContent />}/>
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Privacy;