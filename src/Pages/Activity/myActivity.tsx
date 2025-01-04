import  { useContext, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { UserContext } from "../../App"; // Ensure proper type import
import { useMutation, useQuery } from "@tanstack/react-query";
import { users } from "../../lib/http";
import ApartmentPreviewCard from "../Discover/apartmentPreviewCard";
import RoommatePreviewCard from "../Discover/roommatePreviewCard";
import { VoteType } from "../../lib/interfaces";

interface UserProfile {
  userType: "apartment" | "roommate";
  profile: {
    questionnaire: any; // Replace `any` with the correct type
  };
}

export default function MyActivity() {
  const context = useContext(UserContext) ;
  const user = context?.user as UserProfile | null;

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const searchType: "apartment" | "roommate" =
    user.userType === "apartment" ? "roommate" : "apartment";

  const CardComponent = useMemo(
    () => (searchType === "apartment" ? ApartmentPreviewCard : RoommatePreviewCard),
    [searchType]
  );

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["myActivity", user],
    queryFn: users.activity,
  });

  const actionMutation = useMutation({
    mutationFn: users.action,
    onSuccess: () => refetch(),
  });

  const handleAction = (id: string, action: string) => {
    actionMutation.mutate({ id, action });
  };

  if (isPending) return <p>Loading...</p>;
  if (isError && error instanceof Error) return <p>Error: {error.message}</p>;

  function setActiveTab(_value: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <Tabs defaultValue="likes" onValueChange={(value: any) => setActiveTab(value)} className="lg:container">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="likes">Likes</TabsTrigger>
        <TabsTrigger value="dislikes">Dislikes</TabsTrigger>
      </TabsList>
      {["likes", "dislikes"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <div className="flex flex-col gap-8">
            {data?.[tab]?.map((item: any) => (
              <CardComponent
                key={item[searchType]._id}
                data={item}
                myAnswers={user.profile.questionnaire}
                onAction={handleAction}
                vote={tab.slice(0, -1) as VoteType } 
              />
            ))}
          </div>
          {data?.[tab]?.length === 0 && <p>No {tab} found</p>}
        </TabsContent>
      ))}
    </Tabs>
  );
}
