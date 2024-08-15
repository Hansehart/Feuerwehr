import "./MobileStartPreviewStyle.css";
import intro from "/src/assets/videos/intro.mp4";

export default function MobileStartPreview() {
  return (
    <section id="start-video-section">
      <video playsInline autoPlay muted loop id="start-video-intro">
        <source src={intro} type="video/mp4" />
      </video>
      <section id="start-preview-text">
        <h2 className="slide-in-left">Gemeinwohl im Sinn</h2>
        <h2 className="slide-in-right">Feuer im Herzen</h2>
      </section>
    </section>
  );
}
