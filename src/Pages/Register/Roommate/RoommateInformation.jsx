import React, { useCallback, useState } from "react";
import Input from "@/components/Coustom/Input";
import { Button } from "@/components/ui/button";
import SelectOptions from "@/components/Coustom/Select";
import ComboboxSelectionsBadge from "@/components/Coustom/ComboboxSelectionsBadge";
import {
  hobbiesList,
  occupationList,
  educationList,
} from "@/lib/RegisterRoommate";
import AutocompleteCombobox from "@/components/Coustom/AutocompleteCombobox";

import ElderlyOutlinedIcon from "@mui/icons-material/ElderlyOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import { Instagram, Twitter, Facebook, Upload } from "lucide-react";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LocationSearch from "../../Prefrences/LocationSearch";
import DateSelection from "../../Prefrences/DateSelection";
import ProfilePictureUpload from "@/components/Coustom/ProfilePictureUpload";
import { Divider, Typography } from "@mui/material";

export default function RoommateInformation({ onSubmit }) {
  const [img, setImg] = useState([]);
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [interests, setInterests] = useState([]);
  const [date, setDate] = useState(null);
  const [about, setAbout] = useState("");

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation.address);
  };

  function handleSocialMediaChange(name, value) {
    setSocialMedia({ ...socialMedia, [name]: value });
  }
  const handleImageChange = useCallback((file) => {
    setImg([file]);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      img,
      age,
      location,
      gender,
      socialMedia,
      occupation,
      education,
      interests,
      date: date instanceof Date ? format(date, "PPP") : date, // Format date if it's a Date object

      // Add more fields to submit
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-4xl font-extrabold lg:text-5xl h-40 flex items-center justify-center">
        Roommate Information:
      </h1>
      <div className="flex flex-col gap-16">
        <div>
          <ProfilePictureUpload onChange={handleImageChange} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Overview</Typography>
          </Divider>

          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Age"
              placeholder={"How old are you?"}
              type="number"
              value={age}
              icon={<ElderlyOutlinedIcon />}
              onChange={(e) => setAge(e.target.value)}
            />
            <LocationSearch
              onLocationChange={handleLocationChange}
              label="From"
              placeholder={"where are you from?"}
              disabled={false}
            />

            <SelectOptions
              label="Gender"
              options={["Male", "Female", "Other"]}
              value={gender}
              icon={<WcOutlinedIcon />}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Your gender"
            />

            <AutocompleteCombobox
              label="Occupation"
              options={occupationList}
              value={occupation}
              onChange={(event, newValue) => setOccupation(newValue)}
              icon={<HandymanOutlinedIcon />}
              placeholder="What do you do for living?"

            />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Education</Typography>
          </Divider>

          <SelectOptions
            label="Education"
            options={educationList}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            icon={<SchoolOutlinedIcon />}
            placeholder="What is your highest level of education?"
          />
        </div>
        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Hobbies</Typography>
          </Divider>
          <ComboboxSelectionsBadge
            label="Hobbies"
            list={hobbiesList}
            selected={interests}
            onChange={(selected) => setInterests(selected)}
            icon={<SportsBasketballOutlinedIcon />}
            placeholder="Select your hobbies"
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Social Media</Typography>
          </Divider>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Instagram"
              value={socialMedia.instagram}
              icon={<Instagram />}
              onChange={(e) =>
                handleSocialMediaChange("instagram", e.target.value)
              }
              placeholder={"Your Instagram username"}
            />
            <Input
              label="Twitter"
              value={socialMedia.twitter}
              icon={<Twitter />}
              onChange={(e) =>
                handleSocialMediaChange("twitter", e.target.value)
              }
              placeholder={"Your Twitter username"}
            />
            <Input
              label="Facebook"
              value={socialMedia.facebook}
              icon={<Facebook />}
              onChange={(e) =>
                handleSocialMediaChange("facebook", e.target.value)
              }
              placeholder={"Your Facebook username"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Entry Date</Typography>
          </Divider>

          <DateSelection value={date} onChange={setDate} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">About</Typography>
          </Divider>

          <Input
            label="About"
            id="about"
            type="textarea"
            value={about}
            multiline
            icon={<ImportContactsOutlinedIcon />}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell about yourself"
          />
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
