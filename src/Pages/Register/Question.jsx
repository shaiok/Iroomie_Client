import React, { useState, useEffect } from "react";
import RadioCombobox from "@/components/Coustom/radioCbx";
import { Slider } from "@/components/ui/slider";

const importanceMap = [
  "Not a Priority",
  "Low Priority",
  "Moderate Priority",
  "High Priority",
  "Top Priority",
];

const Question = ({ question, onAnswer, currentAnswer }) => {
  const [value, setValue] = useState(
    currentAnswer?.value ?? null
  );
  const [importance, setImportance] = useState(currentAnswer?.importance ?? 3);

  // Reset state when question changes
  useEffect(() => {
    setValue(currentAnswer?.value ?? null);
    setImportance(currentAnswer?.importance ?? 3);
  }, [question.id, currentAnswer]);

  useEffect(() => {
    if (value !== null) {
      onAnswer(value, importance);
    }
  }, [value, importance, onAnswer]);

  const handleAnswerChange = (index) => {
    setValue(index+1);
  };

  const handleImportanceChange = (value) => {
    setImportance(value[0]);
  };

  return (
    <div className="flex flex-col max-w-4xl w-full lg:gap-8 gap-4 text-sm lg:text-lg h-full ">
      <h2 className="lg:text-xl text-lg font-semibold lg:h-20 h-16 flex items-center justify-center">
        {question.question}
      </h2>
      <main className="flex flex-col h-full gap-4">
        <section className="flex flex-col gap-4">
          {question.answers.map((answer, index) => (
            <RadioCombobox
              key={index}
              value={index}
              onChange={() => handleAnswerChange(index)}
              checked={value -1 === index}
              label={answer}
              style="lg:h-20 h-14 w-full"
            />
          ))}
        </section>

        {value !== null && (
          <section className="flex flex-col gap-3">
            <p className="mb-2">How important is this to you?</p>
            <Slider
              defaultValue={[3]}
              value={[importance]}
              max={5}
              min={1}
              step={1}
              onValueChange={handleImportanceChange}
            />
            <p className="text-center text-xl font-semibold">{importanceMap[importance-1]}</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Question;
