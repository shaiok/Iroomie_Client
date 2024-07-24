import { apartmentExp, roommateExp } from "@/lib/test";
import ApartmentPreviewCard from "./apartmentPreviewCard";
import RoommatePreviewCard from "./roommatePreviewCard";
import { useContext } from "react";
import { UserContext } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { apartments, users } from "@/lib/http";
import { Link } from "react-router-dom";

export default function CardsList() {
  const { user } = useContext(UserContext);
  const searchType = user.searchType === "apartment" ? "roommate" : "apartment";
  const funcType =
    searchType === "apartment" ? apartments.getAll : users.getAll;

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
    <main className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 place-items-center">
      {data.map((item, index) => (
        <Card key={index} data={item}  />
      ))}
    </main>
  );
}