import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/App";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";
import RoommatePreferences from "./RoommatePreferences";
import ApartmentPreferences from "./ApartmentPreferences";
import { useMutation } from "@tanstack/react-query";
import { roommates, apartments } from "@/lib/http";

export default function PreferencesPage() {
  const { user } = useContext(UserContext);
  const userType = user.user.userType;

  const [preferences, setPreferences] = useState(
    userType === "roommate"
      ? {
          rentRange: 5000,
          bedrooms: 2,
          bathrooms: 1,
          minSize: 50,
          details: {
            AC: false,
            Parking: false,
            Balcony: false,
            Furnished: false,
            Elevator: false,
            "Pet Friendly": false,
            "Smoking Allowed": false,
          },
          leaseDuration: 12,
          address: {
            street: "",
            city: "",
            coordinates: [],
          },
          radius: 500,
          moveInDateStart: null,
        }
      : {
          ageRange: [20, 40],
          genderPreference: "All",
          occupations: [],
          sharedInterests: [],
        }
  );

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (data) =>
      userType === "roommate"
        ? roommates.setPreferences(data)
        : apartments.setPreferences(data),
    onSuccess: (data) => {
      console.log("Preferences was updated successfully:", data);
    },
    onError: (error) => {
      console.error("Preferences update error:", error);
    },
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const handleSave = async () => {
    console.log("Saving preferences:", preferences);
    mutate(preferences);

  };

  return (
    <div className="grid p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Your Preferences</h1>
        <p className="text-gray-600 mb-8">
          Set your preferences to help us find the perfect{" "}
          {userType === "roommate" ? "apartment" : "roommate"} for you.
        </p>
      </div>
      <Separator className="my-6" />
      {userType === "roommate" ? (
        <RoommatePreferences
          preferences={preferences}
          setPreferences={setPreferences}
        />
      ) : (
        <ApartmentPreferences
          preferences={preferences}
          setPreferences={setPreferences}
        />
      )}
      <div className="mt-8 flex items-center justify-between">
        <Button
          className="w-full"
          onClick={handleSave}
          disabled={isPending || isSuccess}
        >
          {isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
      {isSuccess && (
        <p className="mt-4 text-center text-green-600">
          Your preferences have been saved successfully!
        </p>
      )}
    </div>
  );
}
