// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "@/App";
// import { useQuery } from "@tanstack/react-query";
// import { apartments, roommates } from "@/lib/http";
// import MatchToy from "@/components/Coustom/RoomatesAvatar";
// import { Card } from "@/components/ui/card";

// export default function Chat() {
//   const { user } = useContext(UserContext);
//   const searchType = user.searchType === "apartment" ? "roommate" : "apartment";
//   const funcType =
//     searchType === "apartment" ? apartments.getMetaches : roommates.getMetaches;
//   const [matches, setMatches] = useState([]);

//   const { data, isPending, isError, error } = useQuery({
//     queryKey: ["chat", searchType],
//     queryFn: funcType,
//   });

//   useEffect(() => {
//     if (data) {
//       setMatches(data);
//       console.log(data);
//     }
//   }, [data]);

//   if (isPending) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="grid lg:grid-cols-3 gap-4 h-[90vh]">
//       <Card className="p-2 h-full overflow-auto ">
//         {matches.map(({ match, matchInfo }) => 

//         <MatchToy
//           key={1}
//           image={matchInfo.image}
//           score={matchInfo.score}
//           title={matchInfo.title}
//           subTitle={matchInfo.subTitle}
//         />
        
//         )}
//       </Card>
//       <Card className="col-span-2 p-2 h-full flex items-center justify-center">
//         chat
//       </Card>
//     </div>
//   );
// }


import { useQuery } from "@tanstack/react-query";
import { users } from "@/lib/http";
import MatchToy from "@/components/Coustom/RoomatesAvatar";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const { data: matches, isPending, isError, error } = useQuery({
    queryKey: ["chat", "matches"],
    queryFn: users.matches,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid lg:grid-cols-3 gap-4 h-[90vh]">
      <Card className="p-2 h-full overflow-auto">
        {matches && matches.map(({ match, matchInfo }) => (
          <MatchToy
            key={match._id}
            image={matchInfo.image}
            score={matchInfo.score}
            title={matchInfo.title}
            subTitle={matchInfo.subTitle}
          />
        ))}
      </Card>
      <Card className="col-span-2 p-2 h-full flex items-center justify-center">
        chat
      </Card>
    </div>
  );
}