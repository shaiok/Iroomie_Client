import React from "react";
import ImportanceSlider from "@/components/Coustom/ImportanceSlider";
import RadioButton from "@/components/Coustom/RadioButton.jsx";

import SliderValues from "@/components/Coustom/ImportanceSlider";

const Question = ({ question, onAnswer, currentAnswer }) => {
  const handleSelection = (index) => {
    console.log("index");
    onAnswer(index, currentAnswer?.importance || 3);
  };

  const handleImportance = (importance) => {
    onAnswer(currentAnswer?.answerIndex - 1, importance);
  };

  return (
    <div className="grid auto-rows-auto gap-4 grid-flow-row p-4 overflow-y-auto">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-800 h-16 flex items-center ">
        {question.question}
      </h2>
      <ul className="space-y-4">
        {question.answers.map((answer, index) => (
          <li key={index} className="w-full">
            <RadioButton
              id={`answer-${index}`}
              name={`question-${question.id || "default"}`}
              label={answer}
              checked={currentAnswer?.answerIndex === index + 1}
              handleSelection={() => handleSelection(index)}
            />
          </li>
        ))}
      </ul>
      <div className="h-24 w-full">
        {currentAnswer && (
          <SliderValues
            value={currentAnswer.importance}
            onChange={handleImportance}
            labels={{
              1: "Not a Priority",
              2: "Low Priority",
              3: "Moderate Priority",
              4: "High Priority",
              5: "Top Priority",
            }}
            min={1}
            max={5}
            step={1}
            title="Rate the Importance:"
            sliderColor="#000000"
            thumbColor="#ffffff"
            thumbBorderColor="#000000"
          />
        )}
      </div>
    </div>
  );
};

export default Question;
