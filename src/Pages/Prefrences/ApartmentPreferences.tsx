import {
  RangeSlider,
  MultiSelect,
} from "./PreferenceComponents";
import {
  Users,
  Briefcase,
  Music,
  Film,
  Gamepad2,
  GraduationCap,
  Clock,
  Laptop,
  Shield,
  Book,
  Utensils,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";

const occupationOptions: { value: string; label: string; icon: React.ElementType }[] = [
  { value: "Soldier", label: "Soldier", icon: Shield },
  { value: "Student", label: "Student", icon: GraduationCap },
  { value: "Part-Time", label: "Part-Time Worker", icon: Clock },
  { value: "Full-Time", label: "Full-Time Employee", icon: Briefcase },
  { value: "Freelancer", label: "Freelancer", icon: Laptop },
];

const interestOptions: { value: string; label: string; icon: React.ElementType }[] = [
  { value: "Music", label: "Music", icon: Music },
  { value: "Movies", label: "Movies", icon: Film },
  { value: "Sports", label: "Sports", icon: Gamepad2 },
  { value: "Reading", label: "Reading", icon: Book },
  { value: "Cooking", label: "Cooking", icon: Utensils },
];

export interface APreferences {
  ageRange: [number, number];
  gender: string[];
  occupations: string[];
  sharedInterests: string[];
}

interface ApartmentPreferencesProps {
  preferences: APreferences;
  setPreferences: React.Dispatch<React.SetStateAction<APreferences>>;
}

export default function ApartmentPreferences({
  preferences,
  setPreferences,
}: ApartmentPreferencesProps) {
  const updatePreference = (key: string, newValue: any) => {
    setPreferences((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div className="lg:container">
      <div className="flex flex-col gap-6 sm:gap-8">
        <RangeSlider
          label="Age Range"
          value={preferences.ageRange}
          onChange={(newValue: any) => updatePreference("ageRange", newValue)}
          min={18}
          max={60}
          step={1}
          icon={Users}
        />

        <Separator />

        <MultiSelect
          label="Gender Preference"
          options={[
            { value: "Male", label: "Male", icon: Users },
            { value: "Female", label: "Female", icon: Users },
            { value: "NonBinary", label: "Non-binary", icon: Users },
          ]}
          value={preferences.gender}
          onChange={(newValue: any) => updatePreference("gender", newValue)}
        />

        <Separator />

        <MultiSelect
          label="Preferred Occupations"
          options={occupationOptions}
          value={preferences.occupations}
          onChange={(newValue: any) => updatePreference("occupations", newValue)}
        />

        <Separator />

        <MultiSelect
          label="Shared Interests"
          options={interestOptions}
          value={preferences.sharedInterests}
          onChange={(newValue: any) => updatePreference("sharedInterests", newValue)}
        />
      </div>
    </div>
  );
}
