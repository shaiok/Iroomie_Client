import React from "react";
import { Badge } from "../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { questions } from "../../lib/register";
import { Slider } from "../ui/slider";
import { cn } from "../../lib/utils";

interface Answer {
  value?: number;
  importance?: number;
}

interface QuestionAnswerSummaryProps {
  myAnswers: Record<string, Answer>;
  otherAnswers?: Record<string, Answer>;
  myProfile?: boolean;
}

interface AnswerSliderProps {
  value: number;
  label: string;
  color: string;
  max: number;
}

interface ImportanceSliderProps {
  value: number;
  label: string;
  color: string;
}

const AnswerAlignmentMap: React.FC<QuestionAnswerSummaryProps> = ({
  myAnswers,
  otherAnswers,
}) => {
  const getAlignmentCounts = () => {
    const counts = { same: 0, gap1: 0, gap2: 0, gap3: 0, gap4: 0 };
    Object.keys(myAnswers).forEach((questionId) => {
      const myValue = myAnswers[questionId]?.value;
      const otherValue = otherAnswers?.[questionId]?.value;
      if (myValue !== undefined && otherValue !== undefined) {
        const gap = Math.abs(myValue - otherValue);
        if (gap === 0) counts.same++;
        else if (gap === 1) counts.gap1++;
        else if (gap === 2) counts.gap2++;
        else if (gap === 3) counts.gap3++;
        else if (gap >= 4) counts.gap4++;
      }
    });
    return counts;
  };

  const counts = getAlignmentCounts();

  const alignmentData = [
    { gap: 0, text: "You're meant to be!", color: "text-blue-900 bg-blue-100", count: counts.same },
    { gap: 1, text: "Almost there!", color: "text-green-900 bg-green-100", count: counts.gap1 },
    { gap: 2, text: "Not too far apart", color: "text-yellow-900 bg-yellow-100", count: counts.gap2 },
    { gap: 3, text: "Quite different", color: "text-orange-900 bg-orange-100", count: counts.gap3 },
    { gap: 4, text: "Opposites attract?", color: "text-red-900 bg-red-100", count: counts.gap4 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
        {alignmentData.map((item) => (
          <div key={item.gap} className="flex flex-col items-center">
            <Badge variant="outline" className={cn("mb-1 w-full py-2 flex justify-center", item.color)}>
              {item.count}
            </Badge>
            <span className="text-xs font-medium text-gray-600">{item.text}</span>
            <span className="text-xs text-gray-400">(Gap: {item.gap})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnswerSlider: React.FC<AnswerSliderProps> = ({ value, label, color, max }) => (
  <div className="w-full bg-white rounded-lg shadow-sm p-4 mt-2">
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <label className={cn(`text-sm font-medium`, `text-${color}`)}>{label}</label>
        <span className={cn(`text-sm`, `text-${color}`)}>{value}</span>
      </div>
      <Slider value={[value]} max={max} min={1} step={1} />
    </div>
  </div>
);

const ImportanceSlider: React.FC<ImportanceSliderProps> = ({ value, label, color }) => (
  <div className="w-full bg-white rounded-lg shadow-sm p-4 mt-2">
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <label className={cn(`text-sm font-medium`, `text-${color}`)}>{label}</label>
        <span className={cn(`text-sm`, `text-${color}`)}>{value}</span>
      </div>
      <Slider defaultValue={[value]} max={5} min={1} step={1} />
    </div>
  </div>
);

const QuestionAnswerSummary: React.FC<QuestionAnswerSummaryProps> = ({
  myAnswers,
  otherAnswers,
  myProfile = false,
}) => {
  const isComparative = !myProfile;

  if (!myAnswers && !otherAnswers)
    return <p className="text-center text-gray-500 my-8">No answers available</p>;

  const defaultOpenValues = questions.map((_: any, index: any) => `category-${index}`);

  return (
    <div>
      {isComparative && <AnswerAlignmentMap myAnswers={myAnswers} otherAnswers={otherAnswers} />}
      <Accordion type="multiple" defaultValue={defaultOpenValues} className="w-full space-y-4">
        {questions.map((category: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; questions: any[]; }, categoryIndex: React.Key | null | undefined) => (
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
                {category.questions.map((question, _questionIndex) => {
                  const myAnswer = myAnswers?.[question.id];
                  const otherAnswer = otherAnswers?.[question.id];

                  if (!myAnswer?.value && !otherAnswer?.value) return null;

                  const getAnswerText = (answer?: Answer) => {
                    if (!answer?.value) return "No answer";
                    const answerIndex = answer.value - 1;
                    return question.answers[answerIndex] || "Invalid answer";
                  };

                  const myAnswerText = getAnswerText(myAnswer);
                  const otherAnswerText = isComparative ? getAnswerText(otherAnswer) : null;

                  return (
                    <div
                      key={question.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="space-y-3">
                        <h3 className="text-md font-medium text-gray-800">{question.question}</h3>
                        <div className="space-y-2">
                          <Badge
                            className="w-full px-3 py-1 text-blue-900 bg-blue-50 border-blue-200 text-sm"
                            variant="outline"
                          >
                            Me: {myAnswerText}
                          </Badge>
                          <AnswerSlider
                            value={myAnswer?.value || 1}
                            label="Me"
                            color="blue"
                            max={question.answers.length}
                          />
                          {!isComparative && (
                            <ImportanceSlider
                              value={myAnswer?.importance || 1}
                              label="Importance"
                              color="blue"
                            />
                          )}
                          {isComparative && (
                            <>
                              <Badge
                                className="w-full px-3 py-1 text-green-900 bg-green-50 border-green-200 text-sm mt-4"
                                variant="outline"
                              >
                                Other: {otherAnswerText}
                              </Badge>
                              <AnswerSlider
                                value={otherAnswer?.value || 1}
                                label="Other"
                                color="green"
                                max={question.answers.length}
                              />
                            </>
                          )}
                        </div>
                        {isComparative && myAnswer?.value === otherAnswer?.value && (
                          <div className="mt-4 text-center text-sm">
                            <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                              Same answer! 🎉
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default QuestionAnswerSummary;
