import "./MobileQuizCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

function MobileQuizCard() {
  return (
    <div>
      <section
        className="question"
        style={{ backgroundImage: `url(${drivingFirefighters})` }}
      >
        <h2>How much is the fish?</h2>
      </section>
      <section className="type">
        <h3>Einzelauswahl</h3>
      </section>
      <section className="select">
        <div className="answer">
          <p>50.000</p>
        </div>
        <div className="answer">
          <p>80.000</p>
        </div>
        <div className="answer">
          <p>30.000</p>
        </div>
        <div className="answer">
          <p>100.000</p>
        </div>
      </section>
    </div>
  );
}

export default MobileQuizCard;
