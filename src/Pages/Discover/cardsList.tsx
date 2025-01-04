import { useContext, useState, useMemo } from "react";
import { UserContext } from "../../App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { users } from "../../lib/http";
import ApartmentPreviewCard from "./apartmentPreviewCard";
import RoommatePreviewCard from "./roommatePreviewCard";
import SortDropDown from "../../components/Coustom/rdDrop";

export default function CardsList() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext is not provided");
  }

  const { user } = context;

  if (!user) {
    throw new Error("User is not defined");
  }

  const [sortConfig, setSortConfig] = useState({ option: "score", order: "desc" });
  const myAnswers = user.profile?.questionnaire;
  const searchType = user.userType === "apartment" ? "roommate" : "apartment";
  const CardComponent = searchType === "apartment" ? ApartmentPreviewCard : RoommatePreviewCard;

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["suggestions"],
    queryFn: users.suggestions,
  });

  const actionMutation = useMutation({
    mutationFn: users.action,
    onSuccess: () => refetch(),
  });

  const handleAction = (id: string, action: string) => {
    actionMutation.mutate({ id, action });
  };

 

  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const aValue = a.sortOption[sortConfig.option] ?? 0;
      const bValue = b.sortOption[sortConfig.option] ?? 0;

      let comparison;
      if (sortConfig.option === "date") {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        comparison = aDate - bDate;
      } else {
        comparison = aValue - bValue;
      }

      return sortConfig.order === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSortChange = (newSortConfig: { option: string; order: string }) => {
    setSortConfig(newSortConfig);
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error instanceof Error ? error.message : "An error occurred"}</p>;
  if (!data || data.length === 0) return <p>No suggestions found</p>;

  return (
    <>
      <div className="w-full flex justify-end lg:container">
        <SortDropDown onSortChange={handleSortChange} searchType={searchType} />
      </div>
      <main className="flex flex-col gap-8 lg:container">
        {sortedData.map((item, index) => (
          <CardComponent
            key={index}
            data={item}
            myAnswers={myAnswers}
            onAction={handleAction} vote={"match"}          
          />
        ))}
      </main>
    </>
  );
}
