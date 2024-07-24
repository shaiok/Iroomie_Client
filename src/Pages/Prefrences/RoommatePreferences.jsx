import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dog } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PreferenceSlider, MultiSelect, AddressPreference ,DateRangePicker } from './PreferenceComponents';

const RoommatePreferences = ({ preferences, setPreferences }) => {
  return (
    <>
      <AddressPreference
        address={preferences.address}
        setAddress={(newAddress) => setPreferences({ ...preferences, address: newAddress })}
        radius={preferences.radius}
        setRadius={(newRadius) => setPreferences({ ...preferences, radius: newRadius })}
      />
      <Card>
        <CardHeader>
          <CardTitle>Roommate Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <PreferenceSlider
            label="Age Range"
            value={preferences.ageRange}
            onChange={(newValue) => setPreferences({ ...preferences, ageRange: newValue })}
            min={18}
            max={60}
            step={1}
            icon={Users}
          />
          <MultiSelect
            label="Gender Preference"
            options={[
              { value: 'Male', label: 'Male', icon: Users },
              { value: 'Female', label: 'Female', icon: Users },
              { value: 'Non-binary', label: 'Non-binary', icon: Users },
              { value: 'Any', label: 'Any', icon: Users }
            ]}
            selected={preferences.genderPreference}
            onChange={(newValue) => setPreferences({ ...preferences, genderPreference: newValue })}
          />
          <PreferenceSlider
            label="Cleanliness Level"
            value={preferences.cleanliness}
            onChange={(newValue) => setPreferences({ ...preferences, cleanliness: newValue })}
            min={1}
            max={5}
            step={1}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Dog className="h-4 w-4" />
                Smoking
              </Label>
              <Switch
                checked={preferences.smoking}
                onCheckedChange={(checked) => setPreferences({ ...preferences, smoking: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Dog className="h-4 w-4" />
                Pets
              </Label>
              <Switch
                checked={preferences.pets}
                onCheckedChange={(checked) => setPreferences({ ...preferences, pets: checked })}
              />
            </div>
          </div>
          <MultiSelect
            label="Preferred Occupations"
            options={[
              { value: 'Student', label: 'Student', icon: GraduationCap },
              { value: 'Professional', label: 'Professional', icon: Briefcase },
              { value: 'Artist', label: 'Artist', icon: Music },
              { value: 'Entrepreneur', label: 'Entrepreneur', icon: Coffee },
              { value: 'Any', label: 'Any', icon: Users }
            ]}
            selected={preferences.occupations}
            onChange={(newValue) => setPreferences({ ...preferences, occupations: newValue })}
          />
          <MultiSelect
            label="Shared Interests"
            options={[
              { value: 'Music', label: 'Music', icon: Music },
              { value: 'Movies', label: 'Movies', icon: Film },
              { value: 'Sports', label: 'Sports', icon: Gamepad2 },
              { value: 'Cooking', label: 'Cooking', icon: Utensils },
              { value: 'Travel', label: 'Travel', icon: MapPin },
              { value: 'Reading', label: 'Reading', icon: Book },
              { value: 'Gaming', label: 'Gaming', icon: Gamepad2 }
            ]}
            selected={preferences.sharedInterests}
            onChange={(newValue) => setPreferences({ ...preferences, sharedInterests: newValue })}
          />
        </CardContent>
      </Card>
    
      <DateRangePicker
        startDate={preferences.moveInDateStart}
        endDate={preferences.moveInDateEnd}
        onStartDateChange={(date) => setPreferences({ ...preferences, moveInDateStart: date })}
        onEndDateChange={(date) => setPreferences({ ...preferences, moveInDateEnd: date })}
      />
    </>
  );
};

export default RoommatePreferences;