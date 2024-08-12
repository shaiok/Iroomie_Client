import { cn } from "@/lib/utils";

export default function MatchToy({ image, score, title, subTitle }) {
  return (
    <div className="flex lg:gap-8 gap-4 ">
      <div className="relative">
        <img
          src={image}
          className={cn(
            "rounded-full object-cover ",
            "border-2 border-white",
            "w-[6rem] h-[6rem]",
            "transition-transform duration-300 hover:scale-105"
          )}
        />
        <div
          className={cn(
            "absolute -top-2 -left-2",
            "bg-blue-500 text-white",
            "text-[1rem] font-bold",
            "w-[3rem] h-[3rem] rounded-full",
            "border-2 border-white",
            "flex items-center justify-center"
          )}
        >
          {score}%
        </div>
      </div>
      <div className="col-span-2  text-[1rem] flex flex-col justify-center ">
        <span>{title}</span>
        <span className='text-gray-600 text-[0.8rem] ms-1'>{subTitle}</span>
      </div>
    </div>
  );
}
