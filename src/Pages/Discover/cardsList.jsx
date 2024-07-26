import { apartmentExp, roommateExp } from "@/lib/test";
import ApartmentPreviewCard from "./apartmentPreviewCard";
import RoommatePreviewCard from "./roommatePreviewCard";
import { useContext } from "react";
import { UserContext } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { apartments, roommates } from "@/lib/http";
import { Link } from "react-router-dom";

export default function CardsList() {
  const { user } = useContext(UserContext);
  const searchType = user.searchType === "apartment" ? "roommate" : "apartment";
  const funcType =
    searchType === "apartment" ? apartments.getAll : roommates.getAll;

  const { data, isPending, isError, error } = useQuery({
    queryKey: [searchType],
    queryFn: funcType,
  });

  const Card = ({ data }) =>
    searchType === "apartment" ? (
      <ApartmentPreviewCard apartment={data} />
    ) : (
      <Link to={`/profile/${data.id}`}>
        <RoommatePreviewCard roommate={data} />
      </Link>
    );

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;
  if (data.length === 0) return <p>No {searchType}s found</p>;

  return (
    <main className="grid lg:grid-cols-2 place-items-center gap-8  ">
      {data.map((item, index) => (
        <Card key={index} data={item}  />
      ))}
    </main>
  );
}