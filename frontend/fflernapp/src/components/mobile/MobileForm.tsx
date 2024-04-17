import "./MobileFormStyle.css"
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface MobileFormProps {
  background: boolean;
}

export default function MobileForm({ background }: MobileFormProps) {
  return (
    <section
      className="form"
      style={
        background ? { backgroundImage: `url(${drivingFirefighters})` } : {backgroundImage: "none"}
      }
    >
        <h1>hi</h1>
    </section>
  );
}
