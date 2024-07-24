import React, { useState } from "react";
import PropTypes from "prop-types";
import RadioCombobox from "@/components/Coustom/radioCbx";
import { UsersRound , Building} from "lucide-react";


const UserTypeForm = ({ onSubmit }) => {
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType) {
      onSubmit(userType);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex flex-col  items-center p-4 lg:py-8   "
      >
        <h2 className="lg:h-32 h-20 flex items-center">
        My User Type is a...
        </h2>

      <main className="h-full flex flex-col gap-16 ">
        <div className="flex mx-auto justify-center gap-40">
          <RadioCombobox
            value={"roommate"}
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "roommate"}
            label={<p className="text-2xl font-semibold">Roommate</p>}
            style={"h-80 w-80 border-4 "}
            icon={<UsersRound className="h-48 w-48"/>}
          />
          <RadioCombobox
            value={"apartment"}
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "apartment"}
            label={<p className="text-2xl font-semibold">Apartment</p>}
            style={"h-80 w-80 border-4 "}
            icon={<Building className="h-48 w-48 "/>}
          />
        </div>

        <button
          className="px-8 py-4 w-40 mx-auto bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
          type="submit"
          disabled={!userType}
        >
          Next
        </button>
      </main>
    </form>
  );
};

UserTypeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserTypeForm;
