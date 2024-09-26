import React, { useEffect, useState, useCallback } from 'react';

interface QuizData {
  qid: string;
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
  let styleClasses = "w-full sm:w-5/12 p-4 rounded-xl shadow-md transition-all duration-300 border-4";
  if (isCorrect === true) {
    styleClasses += " bg-green-500 text-white border-green-600";
  } else if (isCorrect === false) {
    styleClasses += " bg-red-100 border-red-500";
  } else if (isSelected) {
    styleClasses += " bg-yellow-100 border-yellow-500";
  } else {
    styleClasses += " bg-white border-gray-300 hover:bg-gray-100";
  }

  return (
    <div
      className={styleClasses}
      id={`answer-${index}`}
      onClick={() => onClick(index)}
    >
      <p className="text-center">{text}</p>
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

  const saveQuizProgress = useCallback((qid: string) => {
    const qidInt = parseInt(qid, 10);
    
    if (isNaN(qidInt)) {
      console.error('Invalid qid:', qid);
      return;
    }

    fetch('https://feuerwehr.hansehart.de/api/service/save/quiz-progress', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: qidInt }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save quiz progress');
        }
      })
      .catch(error => console.error('Error saving quiz progress:', error));
  }, []);

  const handleAnswerClick = (answerIndex: number) => {
    if (!quizData || timerStarted) return;

    const isMultipleChoice = quizData.solutionIndexes.length > 1;
    const isCorrectAnswer = quizData.solutionIndexes.includes(answerIndex);

    if (isMultipleChoice) {
      setSelectedAnswers((prev) => {
        const newSelections = prev.includes(answerIndex)
          ? prev.filter((index) => index !== answerIndex)
          : [...prev, answerIndex];
        
        if (newSelections.length === quizData.solutionIndexes.length) {
          setRevealAnswers(true);
          setTimerStarted(true);
          if (newSelections.every(index => quizData.solutionIndexes.includes(index))) {
            saveQuizProgress(quizData.qid);
          }
        }
        
        return newSelections;
      });
    } else {
      setSelectedAnswers([answerIndex]);
      setRevealAnswers(true);
      setTimerStarted(true);
      if (isCorrectAnswer) {
        saveQuizProgress(quizData.qid);
      }
    }
  };

  if (!quizData) return null;

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
              {quizData.solutionIndexes.length > 1 ? 'Mehrfachauswahl' : 'Einfachauswahl'}
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
                isCorrect={revealAnswers
                  ? quizData.solutionIndexes.includes(index)
                  : null}
              />
            ))}
          </section>
          <section
            className="continue flex justify-center items-center h-16 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors duration-300"
            onClick={fetchQuizData}
          >
            <p id="timer" className="text-lg font-medium text-gray-800">
              {timerStarted ? `Weiter in ${count}` : 'Überspringen'}
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default MobileQuizCard;