import RoundedIcon from "../../general/RoundedIcon";
import hansehart from "/src/assets/icons/hansehart128.png";

export default function MobileInfoFooter() {
  return (
    <footer
      className="text-white text-sm w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,25,42,0) 0%, rgba(5,25,42,0.554) 7%, rgba(5,25,42,1) 12%)",
      }}
    >
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col-reverse md:flex-row md:pt-6 md:justify-between md:items-center w-full">
          <a
            href="https://hansehart.de"
            className="hover:opacity-80 transition-opacity duration-300 mt-2 md:mt-0"
            target="_blank"
          >
            <div className="flex items-center">
              <div className="w-36 h-36 flex justiy-center md:items-center hidden md:block">
                <RoundedIcon
                  icon="hansehart"
                  bgColor="transparent"
                  stroke="none"
                  strokeWidth="1"
                />
              </div>
              <div className="flex">
                <div>
                  <div className="flex">
                  <span className="text-2xl font-semibold">Hansehart</span>
                  <img className="w-10 h-8 md:hidden" src={hansehart}></img></div>
                  <p className="text-sm mt-1 ml-0">
                    © {new Date().getFullYear()} Alle Rechte vorbehalten.
                  </p>
                </div>
              </div>
            </div>
          </a>
          <div className="flex flex-col md:items-center mt-4 md:mt-0">
            <a
              href="/info"
              className="text-2xl font-semibold block self-start hover:opacity-80 transition-opacity duration-300"
            >
              Infopoint
            </a>
            <div>
              <a
                href="/info/imprint"
                className="text-sm m-1 ml-0 hover:underline"
              >
                Impressum
              </a>
              <a href="/info/privacy" className="text-sm m-1 hover:underline">
                Datenschutz
              </a>
              <a href="/info/gtc" className="text-sm m-1 hover:underline">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
