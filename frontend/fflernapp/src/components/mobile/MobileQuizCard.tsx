import "./MobileQuizCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

function MobileQuizCard() {
  const solution = "answer-1";

  const handleAnswerClick = (answerID: string) => {
    const solutionElement = document.getElementById(solution);
    if (solutionElement) {
      solutionElement.style.borderColor = "green";
      const selectedElement = document.getElementById(answerID);
      if (selectedElement && solution != answerID) {
        selectedElement.style.borderColor = "red";
      }
    }
  };

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
        <div
          className="answer"
          id="answer-1"
          onClick={() => handleAnswerClick("answer-1")}
        >
          <p>50.000</p>
        </div>
        <div
          className="answer"
          id="answer-2"
          onClick={() => handleAnswerClick("answer-2")}
        >
          <p>80.000</p>
        </div>
        <div
          className="answer"
          id="answer-3"
          onClick={() => handleAnswerClick("answer-3")}
        >
          <p>30.000</p>
        </div>
        <div
          className="answer"
          id="answer-4"
          onClick={() => handleAnswerClick("answer-4")}
        >
          <p>100.000</p>
        </div>
      </section>
      <section className="continue">
        <h4 id="timer" style={{ display: "hidden" }}>
          Weiter in 3...
        </h4>
      </section>
    </div>
  );
}

export default MobileQuizCard;
