import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PreferenceSlider,
  MultiSelect,
  DateRangePicker,
} from "./PreferenceComponents";
import {
  Users,
  Briefcase,
  Music,
  Film,
  Gamepad2,
  Cigarette,
  Dog,
  Book,
  Utensils,
  Plane,
  GraduationCap,
  Clock,
  Laptop,
  Shield,
} from "lucide-react";

const occupationOptions = [
  { value: "Solider", label: "Soldier", icon: Shield },
  { value: "Student", label: "Student", icon: GraduationCap },
  { value: "Part-Time", label: "Part-Time Worker", icon: Clock },
  { value: "Full-Time", label: "Full-Time Employee", icon: Briefcase },
  { value: "Freelancer", label: "Freelancer", icon: Laptop },
];

const interestOptions = [
  { value: "Music", label: "Music", icon: Music },
  { value: "Movies", label: "Movies", icon: Film },
  { value: "Sports", label: "Sports", icon: Gamepad2 },
  { value: "Reading", label: "Reading", icon: Book },
  { value: "Cooking", label: "Cooking", icon: Utensils },

];

export default function ApartmentPreferences({ preferences, setPreferences }) {
  return (
    <Card className="border-none shadow-none ">
      <CardHeader>
        <CardTitle>Roommate Preferences</CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-16">
        <div className="flex flex-col lg:gap-16 gap-8">
          <PreferenceSlider
            label="Age Range"
            value={preferences.ageRange}
            onChange={(newValue) =>
              setPreferences({ ...preferences, ageRange: newValue })
            }
            min={18}
            max={60}
            step={1}
            icon={Users}
            isRange={true}
          />
          <MultiSelect
            label="Gender Preference"
            single={true}
            options={[
              { value: "All", label: "All", icon: Users },
              { value: "Male", label: "Male", icon: Users },
              { value: "Female", label: "Female", icon: Users },
              { value: "Non-binary", label: "Non-binary", icon: Users },
            ]}
            selected={preferences.genderPreference}
            onChange={(newValue) =>
              setPreferences({ ...preferences, genderPreference: newValue })
            }
          />
        </div>

        <div className="flex flex-col lg:gap-16 gap-8 ">
          <MultiSelect
            label="Preferred Occupations"
            options={occupationOptions}
            selected={preferences.occupations}
            onChange={(newValue) =>
              setPreferences({ ...preferences, occupations: newValue })
            }
          />
          <MultiSelect
            label="Shared Interests"
            options={interestOptions}
            selected={preferences.sharedInterests}
            onChange={(newValue) =>
              setPreferences({ ...preferences, sharedInterests: newValue })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
