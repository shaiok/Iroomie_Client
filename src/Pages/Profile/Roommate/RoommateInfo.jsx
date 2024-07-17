import React from "react";
import { Divider, Typography } from "@mui/material";
import { Instagram, Twitter, Facebook } from "lucide-react";
import ElderlyOutlinedIcon from "@mui/icons-material/ElderlyOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ComboboxSelectionsBadge from "@/components/Coustom/ComboboxSelectionsBadge";
import LinkPreview from "@/components/Coustom/LinkPreview";


const overviewExcerpt = (data) => {
  return {
    Age: {
      val: `${data.age} Years Old`,
      icon: <ElderlyOutlinedIcon />,
    },
    Location: { val: data.from, icon: <LocationOnOutlinedIcon /> },
    Gender: { val: data.gender, icon: <WcOutlinedIcon /> },
    Occupation: {
      val: data.occupation.title,
      icon: <HandymanOutlinedIcon />,
    },
    Education: { val: data.education.slice(0,data.education.indexOf(",")), icon: <SchoolOutlinedIcon /> },

  };
};

const InfoItem = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-2 text-sm">
    <div className="flex justify-center items-center gap-1 text-md font-medium text-blue-700 ">
    <span>{icon}</span>
    <span>{label}</span>
    </div>
    <span className="text-center">{value}</span>
  </div>
);

const LinkItem = ({ icon, value, label, url }) => (
  <div className="flex flex-col items-center justify-between gap-2">
    <div className="flex justify-center items-center gap-1 text-lg font-medium text-blue-700 ">
      {icon}
      {label && <span>{label}</span>}
    </div>
    <LinkPreview url={url} className="text-center">
      {value}
    </LinkPreview>
  </div>
);

export default function RoommateInfo({ data}) {
  const overview = overviewExcerpt(data);
  return (
    <main className="flex flex-col py-8">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-12 items-center">
          <img
            src={data.image}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Overview</Typography>
          </Divider>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(overview).map(([key, info]) => (
              <InfoItem
                key={key}
                value={info.val}
                icon={info.icon}
                label={key}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Interests</Typography>
          </Divider>

          <ComboboxSelectionsBadge
            selected={data.hobbies}
            previewOnly={true}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Social Media</Typography>
          </Divider>

          <div className="flex flex-wrap justify-around gap-8">
            {data.socialMedia.instagram && <LinkItem
              icon={<Instagram />}
              url={`https://www.instagram.com/${data.socialMedia.instagram}/`}
              label="Instagram"
              value={data.socialMedia.instagram}
            />}
            {data.socialMedia.twitter && <LinkItem
              icon={<Twitter />}
              url={`https://x.com/${data.socialMedia.twitter}/`}
              label="Twitter"
              value={data.socialMedia.twitter}
            />}
            {data.socialMedia.facebook && <LinkItem
              icon={<Facebook />}
              url={`https://www.facebook.com/${data.socialMedia.facebook}/`}
              label="Facebook"
              value={data.socialMedia.facebook}
            />}
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Entry Date</Typography>
          </Divider>

          <InfoItem
            icon={<CalendarTodayOutlinedIcon />}
            label="Available From"
            value={data.availability}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">About</Typography>
          </Divider>

          <div className="flex justify-center gap-2">
            <InfoItem
              icon={<ImportContactsOutlinedIcon />}
              value={data.about}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
