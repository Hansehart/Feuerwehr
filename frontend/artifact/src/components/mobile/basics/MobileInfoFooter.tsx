export default function MobileInfoFooter() {
  return (
    <section
      className="text-white"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,25,42,0) 0%, rgba(5,25,42,0.554) 7%, rgba(5,25,42,1) 12%)",
      }}
    >
      <div className="flex justify-evenly items-center h-[15vh]">
        <a href="https://feuerwehr.hansehart.de/info/gtc">AGB</a>
        <p>|</p>
        <a href="https://feuerwehr.hansehart.de/info/imprint">Impressum</a>
        <p>|</p>
        <a href="https://feuerwehr.hansehart.de/info/contact">Kontakt</a>
      </div>
    </section>
  );
}
