import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/App";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";
import RoommatePreferences from "./RoommatePreferences";
import ApartmentPreferences from "./ApartmentPreferences";

export default function PreferencesPage() {
  const { user } = useContext(UserContext);
  const [preferences, setPreferences] = useState(
    user?.userType === "roommate"
      ? {
          ageRange: 25,
          genderPreference: ["Any"],
          cleanliness: 3,
          smoking: false,
          pets: false,
          occupations: ["Any"],
          sharedInterests: [],
          address: {
            street: "",
            city: "",
            coordinates : [],
          },
          radius: 100,
          moveInDateStart: null,
          moveInDateEnd: null,
        }
      : {
          rentRange: 5000,
          bedrooms: 2,
          bathrooms: 1,
          minSize: 50,
          furnished: false,
          parking: false,
          amenities: [],
          leaseDuration: 12,
          address: {
            street: "",
            city: "",
            coordinates : [],
          },
          radius: 100,
          moveInDateStart: null,
          moveInDateEnd: null,
        }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
  }, [preferences]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving preferences:", preferences);
    setIsLoading(false);
    setIsSaved(true);
  };

  return (
    <div className="  p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Preferences</h1>
      <p className="text-gray-600 mb-8">
        Set your preferences to help us find the perfect{" "}
        {user.userType === "roommate" ? "roommate" : "apartment"} for you.
      </p>
      <Separator className="my-6" />
      {user.userType === "roommate" ? (
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
          disabled={isLoading || isSaved}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
      {isSaved && (
        <p className="mt-4 text-center text-green-600">
          Your preferences have been saved successfully!
        </p>
      )}
    </div>
  );
}
