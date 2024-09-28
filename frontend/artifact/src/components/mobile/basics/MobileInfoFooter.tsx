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
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col-reverse md:flex-row md: pt-6 justify-between items-center w-full">
          <div className="flex items-center md:mb-0">
            <div className="w-32 h-32">
              <RoundedIcon
                icon="hansehart"
                bgColor="transparent"
                stroke="none"
                strokeWidth="1"
              />
            </div>
            <div>
              <span className="text-lg font-semibold">Hansehart</span>
              <p className="text-xs mt-1 ml-0">
                © {new Date().getFullYear()} Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
          <div className="flex items-center md:mb-0">
            <div>
              <a
                href="/info"
                className="text-lg font-semibold text-lg font-semibold"
              >
                Infopoint
              </a>
              <div>
                <a
                  href="/info/imprint"
                  className="text-xs m-1 ml-0 hover:underline"
                >
                  Impressum
                </a>
                <a
                  href="/info/datenschutz"
                  className="text-xs m-1 hover:underline"
                >
                  Datenschutz
                </a>
                <a href="/info/gtc" className="text-xs m-1 hover:underline">
                  AGB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
