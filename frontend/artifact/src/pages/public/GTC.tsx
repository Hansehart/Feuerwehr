import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

const GTCContent = () => {
  return (
    <div className="w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Allgemeine Geschäftsbedingungen
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Geltungsbereich
            </h2>
            <p className="text-gray-700">
              Diese Nutzungsbedingungen gelten für die Nutzung dieser
              gemeinnützigen Website. Mit der Nutzung erklärt man sich mit diesen Bedingungen einverstanden.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Zweck der Internetseite
            </h2>
            <p className="text-gray-700">
              Unsere Internetseite dient ausschließlich gemeinnützigen Zwecken.
              Wir bieten Informationen und Ressourcen zu, Thema Feuerwehr.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Nutzung der Inhalte
            </h2>
            <p className="text-gray-700">
              Die auf unserer Seite bereitgestellten Inhalte dürfen für
              nicht-kommerzielle unter Angabe der Quelle Zwecke genutzt werden.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Registrierung und Nutzerkonto
            </h2>
            <p className="text-gray-700">
              Für bestimmte Funktionen kann eine Registrierung erforderlich
              sein. Man ist verpflichtet, die Zugangsdaten geheim zu halten
              und vor unbefugtem Zugriff zu schützen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Datenschutz
            </h2>
            <p className="text-gray-700">
              Wir nehmen den Schutz persönlichen Daten sehr ernst. Einzelheiten
              zur Verarbeitung befinden sich in der separaten <a href="/info/privacy" className="underline">Datenschutzerklärung</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Haftungsausschluss
            </h2>
            <p className="text-gray-700">
              Wir bemühen uns um Richtigkeit und Aktualität der bereitgestellten
              Informationen, können jedoch keine Gewähr dafür übernehmen. Die
              Nutzung der Inhalte erfolgt auf eigene Verantwortung.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Änderungen der Nutzungsbedingungen
            </h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Nutzungsbedingungen bei Bedarf zu
              ändern. Änderungen werden auf dieser Seite bekannt gegeben und
              treten mit der Veröffentlichung in Kraft.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

function GTC() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Infopoint" link="/info" />
      <MobileBody fullscreen={<GTCContent />} />
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
}

export default GTC;
