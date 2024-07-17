import ProgressButtons from "@/components/Coustom/ProgressButtons";
import Stepper from "@/components/Coustom/Stepper";
import React, { useReducer, useCallback } from "react";
import Question from "./Question";

const initialState = {
  currentCategory: 0,
  currentQuestion: 0,
  answers: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: {
            answerIndex: action.payload.answerIndex,
            importance: action.payload.importance,
          },
        },
      };
    case "NEXT_QUESTION":
      if (state.currentQuestion < action.payload.categoryQuestions - 1) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
        };
      } else if (state.currentCategory < action.payload.totalCategories - 1) {
        return {
          ...state,
          currentCategory: state.currentCategory + 1,
          currentQuestion: 0,
        };
      }
      return state;
    case "PREV_QUESTION":
      if (state.currentQuestion > 0) {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
        };
      } else if (state.currentCategory > 0) {
        return {
          ...state,
          currentCategory: state.currentCategory - 1,
          currentQuestion: action.payload.prevCategoryQuestions - 1,
        };
      }
      return state;
    default:
      return state;
  }
}

const Questionnaire = ({ questions, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentCategory, currentQuestion, answers } = state;

  const category = questions[currentCategory];
  const question = category.questions[currentQuestion];

  const handleAnswer = useCallback((answerIndex, importance) => {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: { questionId: question.id, answerIndex: answerIndex + 1, importance },
    });
  }, [question.id]);

  const handleNext = useCallback((e) => {
    e.preventDefault();
    if (
      currentCategory === questions.length - 1 &&
      currentQuestion === category.questions.length - 1
    ) {
      onSubmit(answers);
    } else {
      dispatch({
        type: "NEXT_QUESTION",
        payload: {
          categoryQuestions: category.questions.length,
          totalCategories: questions.length,
        },
      });
    }
  }, [currentCategory, currentQuestion, category.questions.length, questions.length, answers, onSubmit]);

  const handleBack = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: "PREV_QUESTION",
      payload: {
        prevCategoryQuestions:
          currentCategory > 0
            ? questions[currentCategory - 1].questions.length
            : 0,
      },
    });
  }, [currentCategory, questions]);

  const isFirstQuestion = currentCategory === 0 && currentQuestion === 0;
  const isLastQuestion =
    currentCategory === questions.length - 1 &&
    currentQuestion === category.questions.length - 1;

  return (
    <form onSubmit={handleNext} className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl font-extrabold lg:text-5xl h-40 flex items-center justify-center">
        Your Bio and Importance
      </h1>
      <Stepper
        steps={questions.map((q) => q.category)}
        currentStep={currentCategory}
      />
      <div className="grid grid-cols-2 lg:flex lg:gap-2 auto-rows-auto justify-items-center items-center">
        <div className="col-start-1 row-start-2 ">
          <ProgressButtons
            type="button"
            direction="back"
            onClick={handleBack}
            disabled={isFirstQuestion}
          />
        </div>
        <div className="col-span-2 col-start-1 row-start-1 lg:col-start-2 lg:col-span-8 h-full w-full">
          <Question
            question={question}
            onAnswer={handleAnswer}
            currentAnswer={answers[question.id]}
          />
        </div>
        <div className="col-start-2 row-start-2 lg:col-start-10 lg:row-start-1">
          <ProgressButtons
            type="submit"
            direction="next"
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    </form>
  );
};

export default Questionnaire;