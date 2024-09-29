import "./MobileMapViewStyle.css";


export default function MobileMapPreview() {
  return (
    <section className="department">
      <div className="department-background">
      {/* <iframe width="100%" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=6.6192626953125%2C53.227412682397365%2C11.889953613281252%2C55.22432367289142&amp;layer=mapnik&amp;marker=54.2379454042067%2C9.254608154296875" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=54.2379&amp;mlon=9.2546#map=9/54.2379/9.2546">Größere Karte anzeigen</a></small> */}
      <iframe width="100%" height="400" src="https://www.openstreetmap.org/export/embed.html?bbox=6.6192626953125%2C53.227412682397365%2C11.889953613281252%2C55.22432367289142&amp;layer=mapnik"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=9/54.2379/9.2546">Größere Karte anzeigen</a></small>
      </div>
    </section>
  );
}
