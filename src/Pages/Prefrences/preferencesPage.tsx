import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Loader, Check } from "lucide-react";
import RoommatePreferences, { RPreferences } from "./RoommatePreferences";
import ApartmentPreferences, { APreferences } from "./ApartmentPreferences";
import { useMutation } from "@tanstack/react-query";
import { users } from "../../lib/http";
import { IRoommate, IApartment, IUser } from "../../lib/interfaces";

type Preferences = IRoommate["preferences"] | IApartment["preferences"];

// Type guard for narrowing preferences to RPreferences
function isRoommatePreferences(
  preferences: Preferences | undefined
): preferences is RPreferences {
  return preferences !== undefined && "overview" in preferences; // Add a null/undefined check
}


const initialPreferences: Record<string, Preferences> = {
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
      moveInDateStart: new Date(),
    },
    location: {
      address: {
        street: "bialik",
        city: "tel aviv",
        coordinates: [2, 3],
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
  const context = useContext(UserContext);

  const user = context?.user as IUser | null;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const userType = user.userType;

  const [preferences, setPreferences] = useState<Preferences>(() => {
    const defaultPreferences = initialPreferences[userType as keyof typeof initialPreferences];
    return {
      ...(defaultPreferences || {}),
      ...(user?.profile?.preferences || {}),
    } as Preferences;
  });
  

  const mutation = useMutation({
    mutationFn: users.preferences,
    onSuccess: (data) => {
      console.log("Preferences were updated successfully:", data);
    },
    onError: (error) => {
      console.error("Preferences update error:", error);
    },
  });

  const handleSave = async () => {
    const validatedPreferences = preferences as Record<string, any>;
    console.log("Saving preferences:", validatedPreferences);
    mutation.mutate(validatedPreferences);
  };

  const handleReset = () => {
    const defaultPreferences = initialPreferences[userType];
    setPreferences(defaultPreferences);
  };

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
      {userType === "roommate" && isRoommatePreferences(preferences) ? (
        <RoommatePreferences
          preferences={preferences}
          setPreferences={setPreferences as React.Dispatch<React.SetStateAction<RPreferences>>}
          initialPreferences={initialPreferences.roommate as RPreferences}
        />
      ) : (
        <ApartmentPreferences
        preferences={preferences as APreferences}
        setPreferences={setPreferences as React.Dispatch<React.SetStateAction<APreferences>>}
      />
      
      )}
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
