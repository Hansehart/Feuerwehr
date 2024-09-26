import React, { useEffect, useState, useCallback } from 'react';
import './MobileQuizCardStyle.css';

interface QuizData {
  text: string;
  solutionIndexes: number[];
  selections: string[];
}

interface AnswerProps {
  index: number;
  text: string;
  onClick: (index: number) => void;
  isSelected: boolean;
  isCorrect: boolean | null;
}

const Answer: React.FC<AnswerProps> = ({ index, text, onClick, isSelected, isCorrect }) => {
  let style = {};
  if (isCorrect === true) {
    style = { borderColor: 'green', backgroundColor: 'green', color: 'white' };
  } else if (isCorrect === false) {
    style = { borderColor: 'red' };
  } else if (isSelected) {
    style = { borderColor: 'orange' };
  }

  return (
    <div
      className="answer"
      id={`answer-${index}`}
      onClick={() => onClick(index)}
      style={style}
    >
      <p>{text}</p>
    </div>
  );
};

const MobileQuizCard: React.FC = () => {
  const [count, setCount] = useState(3);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [revealAnswers, setRevealAnswers] = useState(false);

  const fetchQuizData = useCallback(() => {
    setQuizData(null);
    setTimerStarted(false);
    setSelectedAnswers([]);
    setCount(3);
    setRevealAnswers(false);

    fetch('https://feuerwehr.hansehart.de/api/service/receive/quiz')
      .then((response) => response.json())
      .then((data: QuizData) => setQuizData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  useEffect(() => {
    let timer: number | undefined;
    if (timerStarted) {
      timer = window.setInterval(() => {
        setCount((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds === 0) {
            fetchQuizData();
          }
          return newSeconds;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timerStarted, fetchQuizData]);

  const handleAnswerClick = (answerIndex: number) => {
    if (!quizData || timerStarted) return;

    const isMultipleChoice = quizData.solutionIndexes.length > 1;

    if (isMultipleChoice) {
      setSelectedAnswers((prev) => {
        const newSelections = prev.includes(answerIndex)
          ? prev.filter((index) => index !== answerIndex)
          : [...prev, answerIndex];
        
        if (newSelections.length === quizData.solutionIndexes.length) {
          setRevealAnswers(true);
          setTimerStarted(true);
        }
        
        return newSelections;
      });
    } else {
      setSelectedAnswers([answerIndex]);
      setRevealAnswers(true);
      setTimerStarted(true);
    }
  };

  if (!quizData) return null;

  return (
    <div className="quiz w-screen">
      <section className="question bg-secondary text-white">
        <h3>Frage</h3>
        <p>{quizData.text}</p>
      </section>
      <section className="answer-container">
        <section className="type">
          <h3 className="mt-4">
            {quizData.solutionIndexes.length > 1 ? 'Mehrfachauswahl' : 'Einfachauswahl'}
          </h3>
        </section>
        <section className="select">
          {quizData.selections.map((selection, index) => (
            <Answer
              key={index}
              index={index}
              text={selection}
              onClick={handleAnswerClick}
              isSelected={selectedAnswers.includes(index)}
              isCorrect={revealAnswers
                ? quizData.solutionIndexes.includes(index)
                : null}
            />
          ))}
        </section>
        <section
          className="continue"
          onClick={fetchQuizData}
          unselectable="on"
        >
          <p id="timer" style={{ display: 'block' }}>
            {timerStarted ? `Weiter in ${count}` : 'überspringen'}
          </p>
        </section>
      </section>
    </div>
  );
};

export default MobileQuizCard;