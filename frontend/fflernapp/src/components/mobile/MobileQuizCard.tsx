import "./MobileQuizCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

function MobileQuizCard() {
  return (
    <div>
      <section
        className="question"
        style={{ backgroundImage: `url(${drivingFirefighters})` }}
      >
        <h2>Quiz</h2>
      </section>
      <section className="type">
        <h3>Einzelauswahl</h3>
      </section>
      <section className="select"></section>
    </div>
  );
}

export default MobileQuizCard;
