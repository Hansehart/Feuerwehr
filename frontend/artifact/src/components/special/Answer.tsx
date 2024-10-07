import React from "react";

interface AnswerProps {
  index: number;
  text: string;
  onClick: (index: number) => void;
  isSelected: boolean;
  isCorrect: boolean | null;
}

const Answer: React.FC<AnswerProps> = ({
  index,
  text,
  onClick,
  isSelected,
  isCorrect,
}) => {
  let styleClasses =
    "w-full sm:w-5/12 p-4 rounded-xl shadow-md transition-all duration-300 border-4 flex justify-center items-center";

  if (isCorrect === true && isSelected) {
    styleClasses += " bg-green-500 text-white border-green-600";
  } else if (isCorrect === true && !isSelected) {
    styleClasses += " bg-green-200 border-green-400 text-green-800";
  } else if (isCorrect === false && isSelected) {
    styleClasses += " bg-red-500 text-white border-red-600";
  } else if (isCorrect === false) {
    styleClasses += " bg-red-100 border-red-300";
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

export default Answer;
