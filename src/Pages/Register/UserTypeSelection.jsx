import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import RadioButton from "@/components/Coustom/RadioButton";

const UserTypeSelection = ({ onSubmit }) => {
  const [type, setType] = useState("");

  const handleSelection = (event) => {
    const answer = event.target.value
    setType(answer);
    console.log(answer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type) {
      onSubmit({ userType: type });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  h-full gap-8">
      <h1 className="text-4xl font-extrabold lg:text-5xl h-40 flex items-center justify-center">
        Register as:
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RadioButton
          id={1}
          label="apartment"
          icon={
            <HomeWorkRoundedIcon
            sx={{ fontSize: 500 }}
            />
          }
          checked={type === "apartment"}
          handleSelection={handleSelection}
          name="type"
        />
        <RadioButton
          id={2}
          label="roommate"
          checked={type === "roommate"}
          handleSelection={handleSelection}
          icon={
            <Diversity3OutlinedIcon
              sx={{ fontSize: 500 }}

            />
          }
        />
      </div>
      <Button type="submit" disabled={!type} className="mt-4 w-full sm:w-auto">
        Continue
      </Button>
    </form>
  );
};

export default UserTypeSelection;
