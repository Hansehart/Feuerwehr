export default function MobileInfoFooter() {
  return (
    <section className="text-white bg-primary border-t-4 border-secondary">
      <div className="flex justify-evenly items-center h-[15vh]">
        <a href="https://feuerwehr.hansehart.de/info/gtc" target="_blank">
          AGB
        </a>
        <p>|</p>
        <a href="https://feuerwehr.hansehart.de/info/imprint" target="_blank">
          Impressum
        </a>
        <p>|</p>
        <a href="https://feuerwehr.hansehart.de/info/contact" target="_blank">
          Kontakt
        </a>
      </div>
    </section>
  );
}
