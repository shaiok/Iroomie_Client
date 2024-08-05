import { apartmentExp, roommateExp } from "@/lib/test";
import ApartmentPreviewCard from "./apartmentPreviewCard";
import RoommatePreviewCard from "./roommatePreviewCard";
import { useContext } from "react";
import { UserContext } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { apartments, roommates } from "@/lib/http";
import SortDropDown from "@/components/Coustom/rdDrop";

export default function CardsList() {
  const { user } = useContext(UserContext);
  const notToDisplay = user.profile.likes
    .concat(user.profile.dislikes)
    .concat(user.profile.matches);
  const myAnswers = user.profile.questionnaire;
  const searchType = user.searchType === "apartment" ? "roommate" : "apartment";
  const funcType =
    searchType === "apartment" ? apartments.getAll : roommates.getAll;

  const { data, isPending, isError, error } = useQuery({
    queryKey: [searchType],
    queryFn: funcType,
  });

  const Card = ({ cardData  }) =>

    searchType === "apartment" ? (
      <ApartmentPreviewCard data={cardData}  myAnswers={myAnswers}/>
    ) : (
      <RoommatePreviewCard data={cardData} myAnswers={myAnswers} />
    );

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;
  if (data.length === 0) return <p>No {searchType}s found</p>;

  return (
    <>
    <div className="absolute top-0 left-0 bg-gray-50 w-full flex justify-end items-center px-16 h-20">
      <SortDropDown />
    </div>
    <main className="flex flex-col gap-8 max-w-4xl w-full mx-auto mt-20   ">
      {data
        .filter((item) => !notToDisplay.includes(item[searchType]._id))
        .map((item, index) => (
          <Card key={index} cardData={item} />
        ))}
    </main>
    </>
  );
}
