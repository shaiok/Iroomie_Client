import { Separator } from "../ui/separator";

interface SeparatorWithLabelProps {
  label: string;
}

const SeparatorWithLabel: React.FC<SeparatorWithLabelProps> = ({ label }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 col-span-2 " >
      <Separator  />
      <h4 className=" text-lg lg:text-2xl font-medium leading-none text-gray-900">{label}</h4>
    </div>
  );
}

export default SeparatorWithLabel;
