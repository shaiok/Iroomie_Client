import { useQuery } from "@tanstack/react-query";

import RoommatePreview from "./RoommateCardPreview";
import { apartments, users } from "@/lib/http";
import ApartmentPreview from "./ApartmentCardPreview";

export default function DiscoverList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["roommate"],
    queryFn:
      // apartments.getAll,
      users.getAll,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) {
    return null;
  } else {
  }
  if (data.length === 0) return <p>No apartments found</p>;

  return (
    <main className="flex flex-col gap-4 py-8">
      {data.map((d) => (
        // <ApartmentPreview key={d._id}  data={d.apartmentInfo} />
        <RoommatePreview key={d._id} data={d.roommateInfo} />
      ))}
    </main>
  );
}
