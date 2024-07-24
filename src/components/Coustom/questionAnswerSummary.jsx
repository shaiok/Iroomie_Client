import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function QuestionAnswerSummary({ questions, userAnswers }) {
  if (!userAnswers) return <p>User not complete answers section</p>;


  return (
    <div className="h-screen flex flex-col">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 p-4">
          <Accordion type="multiple" className="w-full">
            {questions.map((category, categoryIndex) => (
              <AccordionItem
                value={`category-${categoryIndex}`}
                key={categoryIndex}
              >
                <AccordionTrigger className="text-md font-medium">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 mt-4">
                    {category.questions.map((question, questionIndex) => {
                      const userAnswer = userAnswers[question.id];
                      if (!userAnswer) return null; // Skip if no answer

                      const answerIndex = userAnswer.value - 1; // Adjust for 0-based index
                      const answerText = question.answers[answerIndex];

                      return (
                        <div key={question.id}>
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                              {question.question}
                            </h3>
                            <Badge
                              className="px-4 text-green-700"
                              variant={"outline"}
                            >
                              {answerText}
                            </Badge>

                            <Slider
                              defaultValue={[userAnswer.value]}
                              max={5}
                              step={1}
                              disabled
                              thumbSize={4}
                              trackSize={2}
                            />
                          </div>
                          {questionIndex < category.questions.length - 1 && (
                            <Separator className="my-6" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
