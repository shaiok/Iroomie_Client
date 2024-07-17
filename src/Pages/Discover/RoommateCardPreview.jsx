import React from "react";
import { Card } from "@/components/ui/card";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AnimatedModal from "@/components/Coustom/AnimatedModal";
import RoommateInfo from "@/Pages/Profile/Roommate/RoommateInfo";

const roommatePreview = (data) => {
  return {
    name: data.fullName,
    location: data.from,
    img: data.image,
    education : data.education.slice(0,data.education.indexOf(",")),
    occupation : data.occupation.title,
    age : `${data.age} years old`,
    aboutExcerpt:
      data.about.length > 100
        ? data.about.substring(0, 97) + "..."
        : data.about,
    interests: data.hobbies.join(", "),
  };
};


const PersonalInfoItem = ({ icon: Icon, info }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-5 h-5 text-blue-500" />
    <span className="text-sm text-gray-700">{info}</span>
  </div>
);

export default function RoommatePreview({ data }) {
  const roommate = roommatePreview(data);
console.log(data)

  return (
    <Card className="max-w-4xl overflow-hidden shadow-lg rounded-2xl bg-white relative flex flex-col lg:flex-row">
      <section className="lg:w-2/5 lg:h-72 w-full h-1/2">
        <img
          src={roommate.img || "/placeholder-avatar.jpg"}
          alt={`${roommate.name}`}
          className="w-full h-full object-cover object-center"
        />
      </section>

    
      <section className="flex flex-col justify-between p-4 mb-12 lg:w-3/5">
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <h2 className="lg:text-xl text-lg font-medium text-gray-800">
            {roommate.name}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <PersonalInfoItem icon={SchoolOutlinedIcon} info={roommate.education} />
          <PersonalInfoItem icon={WorkOutlineOutlinedIcon} info={roommate.occupation} />
          <PersonalInfoItem icon={CakeOutlinedIcon} info={roommate.age} />
          <PersonalInfoItem icon={LocationOnOutlinedIcon} info={roommate.location} />
        </div>

        <p className="text-gray-800 mb-2">{roommate.aboutExcerpt}</p>

  
      </section>
      <div className="absolute bottom-0 right-0">
        <AnimatedModal label="Contact">
          <RoommateInfo data={data} />
        </AnimatedModal>
      </div>
    </Card>
  );
}
