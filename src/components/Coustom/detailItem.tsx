import { Check, X } from "lucide-react";

interface DetailItemProps {
  label: string;
  value: boolean;
}

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      ) : (
        <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
      )}
      <span className="text-xs sm:text-sm">{label}</span>
    </div>
  );
}
