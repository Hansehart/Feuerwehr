import {useEffect, useState } from "react";
import "./MobileQuizCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface QuizData {
  text: string;
  solutionIndexes: number[];
  selections: string[];
}

function MobileQuizCard() {
  const [count, setCount] = useState(3);
  const [timerStarted, setTimerStarted] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    fetchQuizData();
  }, [])

  const fetchQuizData = () => {
    setQuizData(null); // clear any data
    fetch(`https://fflernapp.hansehart.de/api/service/receive/quiz`)
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const startTimer = () => {
    const timer = document.getElementById("timer");
    if (timer && !timerStarted) {
      timer.style.display = "block";
      setTimerStarted(true);

      const countdown = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1; // decrement the count
          } else {
            clearInterval(countdown); // stop the countdown
            setTimerStarted(false);
            setCount(3);
            fetchQuizData();
            return prevCount;
          }
        });
      }, 1000); // update every second (1000 milliseconds)

      return () => clearInterval(countdown); // cleanup the interval when component unmounts
    }
  };

  const handleAnswerClick = (answerID: string) => {
    if (quizData) {
      if (quizData.solutionIndexes.length === 1) {
        // single choice
        const solutionID = `answer-${quizData.solutionIndexes[0]}`;
        const solutionElement = document.getElementById(solutionID);
        if (solutionElement && !timerStarted) {
          // element found and timer not started yet (no answer selected)
          solutionElement.style.borderColor = "green";
          solutionElement.style.backgroundColor = "green";
          solutionElement.style.color = "white";
          const selectedElement = document.getElementById(answerID);
          if (selectedElement && solutionID != answerID) {
            // wrong answer selected
            selectedElement.style.borderColor = "red";
          }
        }
      } else {
        // multiple choice
      }
      startTimer();
    }
  };

  return (
    <div>
      {quizData && (
        <div className="quiz">
          <section
            className="question"
            style={{ backgroundImage: `url(${drivingFirefighters})` }}
          >
            <h2>{quizData.text}</h2>
          </section>
          <section className="type">
            <h3>Einzelauswahl</h3>
          </section>
          <section className="select">
            {quizData.selections.map((selection, index) => (
              <div
                key={index}
                className="answer"
                id={`answer-${index}`}
                onClick={() => handleAnswerClick(`answer-${index}`)}
              >
                <p>{selection}</p>
              </div>
            ))}
          </section>
          <section className="continue">
            <h4 id="timer" style={{ display: "none" }}>
              Weiter in {count}...
            </h4>
          </section>
        </div>
      )}
    </div>
  );
}

export default MobileQuizCard;
