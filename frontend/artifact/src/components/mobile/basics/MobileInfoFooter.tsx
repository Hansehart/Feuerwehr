import RoundedIcon from "../../general/RoundedIcon";

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
        <div className="flex flex-col-reverse md:flex-row md:pt-6 justify-between items-center w-full">
          <a
            href="https://hansehart.de"
            className="hover:opacity-80 transition-opacity duration-300"
            target="_blank"
          >
            <div className="flex items-center">
              <div className="w-36 h-36 flex justiy-center items-center">
                <RoundedIcon
                  icon="hansehart"
                  bgColor="transparent"
                  stroke="none"
                  strokeWidth="1"
                />
              </div>
              <div>
                <span className="text-2xl font-semibold">Hansehart</span>
                <p className="text-sm mt-1 ml-0">
                  © {new Date().getFullYear()} Alle Rechte vorbehalten.
                </p>
              </div>
            </div>
          </a>
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <a
              href="/info"
              className="text-2xl  font-semibold block self-start hover:opacity-80 transition-opacity duration-300"
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
              <a
                href="/info/privacy"
                className="text-sm m-1 hover:underline"
              >
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
