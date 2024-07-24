import React, { useState, useCallback } from "react";
import { questionsTest as questions } from "@/lib/register";
import Question from "./Question";

function QuestionnaireForm({ onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];

  const handleAnswer = useCallback(
    (value, importance) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question.id]: { value, importance },
      }));
    },
    [question.id]
  );

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();
      if (currentQuestion === questions.length - 1) {
        onSubmit(answers);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion, questions.length, answers, onSubmit]
  );

  const handleBack = useCallback((e) => {
    e.preventDefault();
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  }, []);

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <form
      onSubmit={handleNext}
      className="h-screen flex flex-col  items-center p-4 lg:py-8   "
    >
      <h2 className="lg:h-32 h-20 flex items-center">
        Choose the right answers for you and rate their importance
      </h2>
      <main className="flex flex-col justify-between w-full h-full items-center ">
        <Question
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          currentAnswer={answers[question.id]}
        />

        <div className="grid grid-cols-3 justify-items-center w-full max-w-xl">
          <div>
            {!isFirstQuestion && (
              <button
                type="button"
                onClick={handleBack}
                className="w-20 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
              >
                Prev
              </button>
            )}
          </div>

          <div className="flex gap-4 ">
            <span>{currentQuestion + 1}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>

          <div className="">
            <button
              type={isLastQuestion ? "submit" : "button"}
              onClick={handleNext}
              className="w-20 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
            >
              {isLastQuestion ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </main>
    </form>
  );
}

export default QuestionnaireForm;
