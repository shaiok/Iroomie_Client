import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { users } from "../../lib/http";
import RoommateProfileForm from "../Register/RoommateProfileForm";
import RoommateProfileDisplay from "../Profile/roommateProfile";
import QuestionnaireForm from "../Register/QuestionnaireForm";
import ApartmentProfileForm from "../Register/ApartmentProfileForm";
import ApartmentProfileDisplay from "../Profile/apartmentProfile";
import { cn } from "../../lib/utils";
import { IApartment, IQuestion, IRoommate } from "../../lib/interfaces";

type EditMode = null | "details" | "questionnaire";

interface UpdatePayload {
  questionnaire?: IQuestion; // Replace with the correct type
  [key: string]: any;
}

export default function MyProfile() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext is not provided");
  }

  const { user, setUser } = context;
  const queryClient = useQueryClient();

  const userType = user?.userType;

  if (!userType) {
    throw new Error("User type is not defined");
  }

  const FormComponent = useMemo(
    () =>
      userType === "apartment"
        ? ApartmentProfileForm
        : RoommateProfileForm,
    [userType]
  );

  const DisplayComponent = useMemo(
    () =>
      userType === "apartment"
        ? ApartmentProfileDisplay
        : RoommateProfileDisplay,
    [userType]
  );

  const [editMode, setEditMode] = useState<EditMode>(null);

  const mutation = useMutation({
    mutationFn: (data: UpdatePayload) => users.update(data),
    onSuccess: (data: any) => {
      setUser((prevUser) => {
        if (!prevUser) {
          throw new Error("Previous user state is undefined");
        }
        return {
          ...prevUser,
          profile: {
            ...prevUser.profile,
            ...data,
          },
        };
      });
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
      setEditMode(null);
    },
  });

  const handleEdit = (mode: EditMode) => {
    setEditMode(mode === editMode ? null : mode);
  };

  const handleSubmit = (data: UpdatePayload) => {
    mutation.mutate(data);
  };

  const renderHeader = () => (
    <div
      className={cn(
        "grid grid-cols-2 container gap-4",
        userType === "apartment"
          ? ""
          : "absolute top-4 left-1/2 transform -translate-x-1/2"
      )}
    >
      <button
        className={cn(
          `flex w-full text-[0.8rem] items-center justify-center p-2 gap-2 rounded-lg border border-dashed font-semibold tracking-widest`,
          userType === "apartment"
            ? "bg-transparent text-gray-700 border-gray-700"
            : "text-white bg-transparent hover:bg-white/55 hover:text-gray-700"
        )}
        onClick={() => handleEdit("details")}
      >
        <span>Edit My Details</span>
      </button>
      <button
        className={cn(
          `flex w-full text-[0.8rem] items-center justify-center p-2 gap-2 rounded-lg border border-dashed font-semibold tracking-widest`,
          userType === "apartment"
            ? "bg-transparent text-gray-700 border-gray-700"
            : "text-white bg-transparent hover:bg-white/55 hover:text-gray-700"
        )}
        onClick={() => handleEdit("questionnaire")}
      >
        <span>Edit Questionnaire</span>
      </button>
    </div>
  );

  if (mutation.isPending) return <p>Saving changes...</p>;
  if (mutation.isError && mutation.error instanceof Error)
    return <p>Error: {mutation.error.message}</p>;

  return (
    <>
      {editMode === "questionnaire" ? (
        <QuestionnaireForm
          initialData={user?.profile?.questionnaire}
          onSubmit={(data) => handleSubmit({ questionnaire: data })}
        />
      ) : editMode === "details" ? (
        <FormComponent
          initialData={user?.profile}
          onSubmit={handleSubmit}
        />
      ) : (
        <DisplayComponent
              profile={user?.profile as IRoommate | IApartment} 
              editHeader={renderHeader}
              myAnswers={user?.profile?.questionnaire}
              myProfile={true} score={0}        />
      )}
    </>
  );
}