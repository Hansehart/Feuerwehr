import { useEffect, useState } from "react";
import "./MobileQuizCardStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface QuizData {
  text: string;
  solutionIndexes: number[];
  selections: string[];
}

function MobileQuizCard() {
  const [count, setCount] = useState(3);
  const [multipleChoice, setMultipleChoice] = useState<string[]>([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = () => {
    setQuizData(null);
    setTimerStarted(false);
    setMultipleChoice([]);
    setCount(3);
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
          startTimer();
        }
      } else {
        // multiple choice
        const solutionIDs = quizData.solutionIndexes.map(
          (index) => `answer-${index}`
        );
        const solutionElements = solutionIDs.map((id) =>
          document.getElementById(id)
        );
        if (solutionElements && !timerStarted) {
          // element found and timer not started yet (not all answers selected)
          const selectedElement = document.getElementById(answerID);
          if (selectedElement) {
            selectedElement.style.borderColor = "orange";
            setMultipleChoice([...multipleChoice, answerID]);
            if (multipleChoice.length === quizData.solutionIndexes.length - 1) {
              // enough answers selected
              const selections = Array.from(
                document.getElementsByClassName("answer")
              );

              selections.forEach((element) => {
                // iterate through every answer
                if (element instanceof HTMLElement) {
                  if (solutionIDs.includes(element.id)) {
                    // solution highlighted
                    element.style.borderColor = "green";
                    element.style.backgroundColor = "green";
                    element.style.color = "white";
                  } else if (
                    multipleChoice.includes(element.id) ||
                    element.id === answerID
                  ) {
                    // wrong choice
                    element.style.borderColor = "red";
                  }
                }
              });
              startTimer();
            }
          }
        }
      }
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
            <h3>{quizData.text}</h3>
          </section>
          <section className="type">
            <h3>
              {quizData.solutionIndexes.length > 1
                ? "Mehrfachauswahl"
                : "Einfachauswahl"}
            </h3>
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
          <section
            className="continue"
            onClick={() => window.location.reload()}
          >
            <h4 id="timer" style={{ display: "none" }}>
              <u>Weiter</u> in {count}...
            </h4>
          </section>
        </div>
      )}
    </div>
  );
}

export default MobileQuizCard;
