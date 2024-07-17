import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger className="border-none p-0 text-gray-500 text-lg h-full font-semibold" asChild>
        <Button
          variant={"outline"}
          className={cn(
            !date && "text-gray-500 text-lg font-semibold border-none cursor-context-menu h-fit"
          )}
        >
          {date ? format(date, "PPP") : <span>Select a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}