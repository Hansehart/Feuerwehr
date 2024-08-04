import "./MobileStartPreviewStyle.css";
import intro from "/src/assets/videos/intro.mp4";

export default function MobileStartPreview() {
  return (
    <section>
      <video autoPlay muted loop>
        <source src={intro} type="video/mp4" id="video-intro"/>
      </video>
      <section id="start-preview-text">
        <p>Gemeinwohl im Sinn</p>
        <p>Feuer im Herzen</p>
      </section>
    </section>
  );
}
