import { Search } from "lucide-react";
import { GenericDrawer } from "./drawer";
import { DrawerClose } from "../ui/drawer";
import QuestionAnswerSummary from "./questionAnswerSummary";

function AnswersDrawer({name, myAnswers, otherAnswers}) {
  return (
    <div>
      <h3 className="text-2xl font-bold p-3">
        {name}'s Answers Summary
      </h3>
      <GenericDrawer
        triggerButton={
          <button className="bg-transparent border border-dashed p-8 text-blue-500 rounded-md w-full flex gap-2 items-center justify-center text-2xl ">
            <Search />
            Click here to see
          </button>
        }
        title="Questionnaire Summary"
        description={`${
          name
        }'s Answers Summary`}
        footer={
          <>
            <DrawerClose asChild>
              <button variant="outline">Cancel</button>
            </DrawerClose>
          </>
        }
      >
        <QuestionAnswerSummary myAnswers={myAnswers} otherAnswers={otherAnswers} />
      </GenericDrawer>
    </div>
  );
}

export default AnswersDrawer;
