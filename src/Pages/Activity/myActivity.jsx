import React, { useState, useContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { apartments, roommates } from "@/lib/http";
import ApartmentPreviewCard from '../Discover/apartmentPreviewCard';
import RoommatePreviewCard from '../Discover/roommatePreviewCard';



export default function MyActivity() {

  const [activeTab, setActiveTab] = useState("likes");
  const { user } = useContext(UserContext);
  
  let lengthToRemove = activeTab === "matches" ? 2 : 1;
  let actionVote = activeTab.substring(0, activeTab.length - lengthToRemove);

    const searchType = user.searchType === "apartment" ? "roommate" : "apartment";
  const funcType = searchType === "apartment" ? apartments.getAll : roommates.getAll;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["myActivity"],
    queryFn: funcType,
  });

  const Card = ({ cardData }) =>
    searchType === "apartment" ? (
      <ApartmentPreviewCard data={cardData} vote={actionVote}  />
    ) : (
      <RoommatePreviewCard data={cardData} vote={actionVote} />
    );

  const filterData = (category) => {
    if (!data) return [];
    switch (category) {
      case "likes":
        return data.filter(item => user.profile.likes.includes(item[searchType]._id));
      case "dislikes":
        return data.filter(item => user.profile.dislikes.includes(item[searchType]._id));
      case "matches":
        return data.filter(item => user.profile.matches.includes(item[searchType]._id));
      default:
        return [];
    }
  };



  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <Tabs defaultValue="likes" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="likes">Likes</TabsTrigger>
        <TabsTrigger value="dislikes">Dislikes</TabsTrigger>
        <TabsTrigger value="matches">Matches</TabsTrigger>
      </TabsList>
      {["likes", "dislikes", "matches"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <div className="flex flex-col gap-8">
            {filterData(tab).map((item, index) => (
              <Card key={index} cardData={item} />
            ))}
          </div>
          {filterData(tab).length === 0 && <p>No {tab} found</p>}
        </TabsContent>
      ))}
    </Tabs>
  );
};

