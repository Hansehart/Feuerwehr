import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Answer from "./Answer";

interface QuizData {
  qid: string;
  text: string;
  solutionIndexes: number[];
  selections: string[];
}

const Quizcard: React.FC = () => {
  const location = useLocation();
  const [count, setCount] = useState(3);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [correctSelectedCount, setCorrectSelectedCount] = useState(0);
  const [animateProgress, setAnimateProgress] = useState(false);

  const getCategory = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category") || "";
  }, [location.search]);

  const fetchQuizData = useCallback(() => {
    setQuizData(null);
    setTimerStarted(false);
    setSelectedAnswers([]);
    setCount(3);
    setRevealAnswers(false);
    setCorrectSelectedCount(0);
    setAnimateProgress(false);

    const category = getCategory();
    fetch(
      `https://feuerwehr.hansehart.de/api/service/receive/quiz?category=${category}`
    )
      .then((response) => response.json())
      .then((data: QuizData) => setQuizData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [getCategory]);

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

  useEffect(() => {
    if (revealAnswers) {
      // Delay the animation start slightly to ensure the bar is rendered
      setTimeout(() => setAnimateProgress(true), 50);
    }
  }, [revealAnswers]);

  const saveQuizProgress = useCallback((qid: string) => {
    const qidInt = parseInt(qid, 10);

    if (isNaN(qidInt)) {
      console.error("Invalid qid:", qid);
      return;
    }

    fetch("https://feuerwehr.hansehart.de/api/service/save/quiz-progress", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: qidInt }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save quiz progress");
        }
      })
      .catch((error) => console.error("Error saving quiz progress:", error));
  }, []);

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
          const correctCount = newSelections.filter((index) =>
            quizData.solutionIndexes.includes(index)
          ).length;
          setCorrectSelectedCount(correctCount);
          if (correctCount === quizData.solutionIndexes.length) {
            saveQuizProgress(quizData.qid);
          }
        }

        return newSelections;
      });
    } else {
      setSelectedAnswers([answerIndex]);
      setRevealAnswers(true);
      setTimerStarted(true);
      const isCorrect = quizData.solutionIndexes.includes(answerIndex);
      setCorrectSelectedCount(isCorrect ? 1 : 0);
      if (isCorrect) {
        saveQuizProgress(quizData.qid);
      }
    }
  };

  if (!quizData) return null;

  const requiredAnswers = quizData.solutionIndexes.length;
  const progressPercentage = (correctSelectedCount / requiredAnswers) * 100;

  return (
    <div className="quiz min-h-[70vh] w-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <section className="question bg-secondary text-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Frage</h3>
          <p className="text-lg">{quizData.text}</p>
        </section>
        <section className="answer-container bg-white rounded-xl shadow-lg p-6">
          <section className="type mb-6">
            <h3 className="text-xl font-semibold text-center text-gray-800">
              {quizData.solutionIndexes.length > 1
                ? "Mehrfachauswahl"
                : "Einfachauswahl"}
            </h3>
          </section>
          <section className="select flex flex-wrap justify-center gap-4 mb-8">
            {quizData.selections.map((selection, index) => (
              <Answer
                key={index}
                index={index}
                text={selection}
                onClick={handleAnswerClick}
                isSelected={selectedAnswers.includes(index)}
                isCorrect={
                  revealAnswers
                    ? quizData.solutionIndexes.includes(index)
                    : null
                }
              />
            ))}
          </section>
          {revealAnswers && (
            <section className="result-bar mb-8">
              <div className="bg-gray-200 rounded-full h-6 w-full overflow-hidden">
                <div
                  className={`bg-green-500 h-6 rounded-full transition-all duration-1000 ease-out ${
                    animateProgress ? 'animate-progress' : ''
                  }`}
                  style={{ 
                    width: animateProgress ? `${progressPercentage}%` : '0%'
                  }}
                ></div>
              </div>
              <p className="text-center mt-2 text-gray-700">
                Du hast {correctSelectedCount} von {requiredAnswers} richtigen Antworten ausgewählt.
              </p>
            </section>
          )}
          <section
            className="continue flex justify-center items-center h-16 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors duration-300"
            onClick={fetchQuizData}
          >
            <p id="timer" className="text-lg font-medium text-gray-800">
              {timerStarted ? `Weiter in ${count}` : "Überspringen"}
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Quizcard;