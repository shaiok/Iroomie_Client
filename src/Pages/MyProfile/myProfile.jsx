import { useContext, useState } from "react";
import { UserContext } from "@/App";

import { Pencil } from "lucide-react";
import RoommateProfileForm from "../Register/RoommateProfileForm";
import RoommateProfileDisplay from "../Profile/roommateProfile";

export default function MyProfile() {
  const { user } = useContext(UserContext);
  const profile = user.profile;
  const [isEdit, setIsEdit] = useState(false);


  function handleEditMyProfile() {
    setIsEdit((prev) => !prev);
  }

  const renderHeader = () => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
      <button
        className="flex gap-2 px-4 py-2 rounded-lg border border-dashed font-semibold tracking-widest text-white bg-transparent hover:bg-white/55  hover:text-gray-700"
        onClick={handleEditMyProfile}
      >
        <span>
          <Pencil />
        </span>
        <span>Edit</span>
      </button>
    </div>
  );

  return (
    isEdit ? (
      <RoommateProfileForm initialData={profile} onSubmit={handleEditMyProfile} />
    ) : (
      <RoommateProfileDisplay profile={profile} renderHeader={renderHeader} />
    )
  );
}
