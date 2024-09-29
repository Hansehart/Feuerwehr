import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

const LicenseContent = () => {
  return (
    <div className="w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Lizenzen
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. React
            </h2>
            <p className="text-gray-700">
              React wird unter der MIT-Lizenz verwendet. Die vollständige Lizenz finden Sie 
              <a href="https://github.com/facebook/react/blob/main/LICENSE" className="text-blue-600 hover:text-blue-800 ml-1">hier</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Tailwind CSS
            </h2>
            <p className="text-gray-700">
              Tailwind CSS wird unter der MIT-Lizenz verwendet. Die vollständige Lizenz finden Sie 
              <a href="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE" className="text-blue-600 hover:text-blue-800 ml-1">hier</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. React Router
            </h2>
            <p className="text-gray-700">
              React Router wird unter der MIT-Lizenz verwendet. Die vollständige Lizenz finden Sie 
              <a href="https://github.com/remix-run/react-router/blob/main/LICENSE.md" className="text-blue-600 hover:text-blue-800 ml-1">hier</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Font Awesome
            </h2>
            <p className="text-gray-700">
              Font Awesome Icons werden unter der CC BY 4.0 Lizenz verwendet. Details zur Lizenz finden Sie 
              <a href="https://fontawesome.com/license/free" className="text-blue-600 hover:text-blue-800 ml-1">hier</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Eigene Inhalte
            </h2>
            <p className="text-gray-700">
              Alle von uns erstellten Inhalte, einschließlich Texte, Bilder und Grafiken, 
              sind urheberrechtlich geschützt. Die Nutzung für nicht-kommerzielle Zwecke 
              ist unter Angabe der Quelle gestattet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Änderungen der Lizenzbedingungen
            </h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Lizenzinformationen bei Bedarf zu aktualisieren. 
              Änderungen werden auf dieser Seite bekannt gegeben und treten mit der 
              Veröffentlichung in Kraft.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

function License() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Infopoint" link="/info" />
      <MobileBody fullscreen={<LicenseContent />} />
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
}

export default License;