import React, { useContext, useState } from "react";
import { UserContext } from "@/App";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";
import RoommatePreferences from "./RoommatePreferences";
import ApartmentPreferences from "./ApartmentPreferences";
import { useMutation } from "@tanstack/react-query";
import { users } from "@/lib/http";

const initialPreferences = {
  roommate: {
    overview: {
      rentRange: 10000,
      bedrooms: 1,
      bathrooms: 1,
      minSize: 20,
    },
    details: {
      AC: true,
      Parking: true,
      Balcony: true,
      Furnished: true,
      Elevator: true,
      "Pet Friendly": true,
      "Smoking Allowed": true,
    },
    leaseDuration: {
      moveInDateStart: new Date().getTime(),
    },
    location: {
      address: {
        street: undefined,
        city: undefined,
        coordinates: [],
      },
      radius: 1000,
    },
  },
  apartment: {
    ageRange: [18, 60],
    gender: [],
    occupations: [],
    sharedInterests: [],
  },
};

export default function PreferencesPage() {
  const { user } = useContext(UserContext);
  const userType = user.user.userType;

  const [preferences, setPreferences] = useState({
    ...initialPreferences[userType],
    ...user.profile.preferences,
    
  });
  console.log(initialPreferences[userType]);

  const mutation = useMutation({
    mutationFn: users.preferences,
    onSuccess: (data) => {
      console.log("Preferences were updated successfully:", data);
    },
    onError: (error) => {
      console.error("Preferences update error:", error);
    },
  });

  const removeEnabledProperty = (obj) => {
    const newObj = { ...obj };
    delete newObj.enabled;

    for (let key in newObj) {
      if (typeof newObj[key] === "object" && newObj[key] !== null) {
        newObj[key] = removeEnabledProperty(newObj[key]);
      }
    }

    return newObj;
  };

  const handleSave = async () => {
    let preferencesToSave = Object.entries(preferences);

    if (userType === "roommate") {
      preferencesToSave=  preferences;
    } else {
      preferencesToSave
        .filter(([key, pref]) => pref.length > 0)
        .reduce((acc, [key, pref]) => {
          acc[key] = pref;
          return acc;
        }, {});
    }

    console.log("Saving preferences:", preferencesToSave);
    mutation.mutate(preferencesToSave);
  };

  const handleReset = () => {
    setPreferences(initialPreferences[userType]);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const PreferencesComponent =
    userType === "roommate" ? RoommatePreferences : ApartmentPreferences;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Preferences</h1>
        <Button variant="outline" onClick={handleReset}>
          Reset All
        </Button>
      </div>
      <p className="text-gray-600 my-4">
        Set your preferences to help us find the perfect{" "}
        {userType === "roommate" ? "apartment" : "roommate"} for you.
      </p>
      <Separator className="my-6" />
      <PreferencesComponent
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <div className="mt-8 flex items-center justify-center">
        <Button
          onClick={handleSave}
          disabled={mutation.isPending || mutation.isSuccess}
        >
          {mutation.isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : mutation.isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
      {mutation.isSuccess && (
        <p className="mt-4 text-center text-green-600">
          Your preferences have been saved successfully!
        </p>
      )}
    </div>
  );
}
