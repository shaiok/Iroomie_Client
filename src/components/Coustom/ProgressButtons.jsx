import React from "react";

import { ArrowBigRight, ArrowBigLeft, CircleCheck } from "lucide-react";

const ProgressButtons = ({ direction, onClick, disabled, isLastQuestion }) => {
  const buttonIcon =
    direction === "back" ? (
      <ArrowBigLeft className="h-6 w-6" />
    ) : isLastQuestion ? (
      <CircleCheck className="h-6 w-6" />
    ) : (
      <ArrowBigRight className="h-6 w-6" />
    );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 bg-gray-100 text-black rounded-full
        disabled:cursor-not-allowed disabled:text-gray-400
      `}
    >
      {buttonIcon}
    </button>
  );
};

export default ProgressButtons;
