import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questions } from "@/lib/register";
import { Slider } from "../ui/slider";

const ImprovedStackedSliders = ({ myValue, otherValue }) => {
  const sameAnswer = myValue === otherValue;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mt-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-blue-500">Me</label>
          <span className="text-sm text-blue-500">{myValue}</span>
        </div>
        <Slider defaultValue={[myValue]} max={5} min={1} step={1} color='blue-500'/>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1 ">
          <label className="text-sm font-medium text-green-500">Other</label>
          <span className="text-sm text-green-500">{otherValue}</span>
        </div>
        <Slider defaultValue={[otherValue]} max={5} min={1} step={1} color='green-500' />
      </div>
    
      {sameAnswer && (
        <div className="mt-8 text-center text-sm">
          <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
            Same answer! 🎉
          </span>
        </div>
      )}
    </div>
  );
};

export default function QuestionAnswerSummary({ myAnswers, otherAnswers }) {
  if (!myAnswers && !otherAnswers)
    return (
      <p className="text-center text-gray-500 my-8">No answers available</p>
    );

  const defaultOpenValues = questions.map((_, index) => `category-${index}`);

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpenValues}
      className="w-full space-y-4"
    >
      {questions.map((category, categoryIndex) => (
        <AccordionItem
          value={`category-${categoryIndex}`}
          key={categoryIndex}
          className="border rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:bg-gray-50 px-4 py-3 transition-colors">
            {category.category}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-6 mt-2">
              {category.questions.map((question, questionIndex) => {
                const myAnswer = myAnswers?.[question.id];
                const otherAnswer = otherAnswers?.[question.id];

                if (!myAnswer?.value && !otherAnswer?.value) return null;

                const getAnswerText = (answer) => {
                  if (!answer?.value) return "No answer";
                  const answerIndex = answer.value - 1;
                  return question.answers[answerIndex];
                };

                const myAnswerText = getAnswerText(myAnswer);
                const otherAnswerText = getAnswerText(otherAnswer);

                return (
                  <div
                    key={question.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="space-y-3">
                      <h3 className="text-md font-medium text-gray-800">
                        {question.question}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                        <Badge
                          className="flex-1 px-3 py-1 text-blue-900 bg-blue-50 border-blue-200 text-sm"
                          variant="outline"
                        >
                          Me: {myAnswerText}
                        </Badge>
                        <Badge
                          className="flex-1 px-3 py-1 text-green-900 bg-green-50 border-green-200 text-sm"
                          variant="outline"
                        >
                          Other: {otherAnswerText}
                        </Badge>
                      </div>
                      <ImprovedStackedSliders
                        myValue={myAnswer?.importance || 1}
                        otherValue={otherAnswer?.importance || 1}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
