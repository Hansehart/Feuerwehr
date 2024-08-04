import "./MobileStartPreviewStyle.css";
import intro from "/src/assets/videos/intro.mp4";

export default function MobileStartPreview() {
  return (
    <section>
      <video autoPlay muted>
        <source src={intro} type="video/mp4"/>
      </video>
    </section>
  );
}
