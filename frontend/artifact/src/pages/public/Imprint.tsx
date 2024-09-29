import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

const ImprintContent = () => {
  return (
    <div className="w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Impressum</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-700">
              Richard Hartung<br />
              Dünenweg 25<br />
              21033 Hamburg
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
            <p className="text-gray-700">
              E-Mail: feuerwehr@hansehart.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">Haftung für Inhalte</h3>
            <p className="text-gray-700 mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">Haftung für Links</h3>
            <p className="text-gray-700 mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">Urheberrecht</h3>
            <p className="text-gray-700">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

function Imprint() {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Infopoint" link="/info" />
      <MobileBody fullscreen={<ImprintContent />}/>
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter/>
    </div>
  );
}

export default Imprint;