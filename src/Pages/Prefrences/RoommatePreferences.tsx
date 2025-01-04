import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  PreferenceSlider,
  AddressPreference,
  DateRangePicker,
} from "./PreferenceComponents";
import {
  Bed,
  Bath,
  DollarSign,
  AirVent,
  ArrowUpDown,
  Dog,
  Cigarette,
  Sofa,
  Car,
  Ruler,
} from "lucide-react";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";

const iconMap: { [key: string]: React.ElementType } = {
  AC: AirVent,
  Parking: Car,
  Balcony: ArrowUpDown,
  Furnished: Sofa,
  Elevator: ArrowUpDown,
  "Pet Friendly": Dog,
  "Smoking Allowed": Cigarette,
};

export interface RPreferences {
  overview: {
    rentRange: number;
    bedrooms: number;
    bathrooms: number;
    minSize: number;
  };
  details: {
    [key: string]: boolean;
  };
  leaseDuration: {
    moveInDateStart: Date;
  };
  location: {
    address: {
      street: string;
      city: string;
      coordinates: [number, number];
    };
    radius: number;
  };
}

interface RoommatePreferencesProps {
  preferences: RPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<RPreferences>>;
  initialPreferences: RPreferences;
}

export default function RoommatePreferences({
  preferences,
  setPreferences,
  initialPreferences,
}: RoommatePreferencesProps) {
  const updatePreference = (key: string, newValue: any) => {
    setPreferences((prev) => {
      const keys = key.split(".");
      const lastKey = keys.pop()!;
      let current = prev as any;
      for (const k of keys) {
        current = current[k] = { ...current[k] };
      }
      current[lastKey] = newValue;
      return { ...prev };
    });
  };

  const toggleDetail = (detail: string) => {
    setPreferences((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [detail]: !prev.details[detail],
      },
    }));
  };

  // Merge default preferences with provided preferences
  const mergedPreferences = { ...initialPreferences, ...preferences };

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 xl:gap-12">
      <div className="flex flex-col gap-6 sm:gap-8">
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col gap-8">
            <PreferenceSlider
              label="Max Rent"
              extraLabel="₪ /month"
              value={mergedPreferences.overview.rentRange}
              onChange={(newValue: any) =>
                updatePreference("overview.rentRange", newValue)
              }
              min={1000}
              max={10000}
              step={100}
              icon={DollarSign}
            />
            <PreferenceSlider
              label="Minimum Bedrooms"
              value={mergedPreferences.overview.bedrooms}
              onChange={(newValue: any) =>
                updatePreference("overview.bedrooms", newValue)
              }
              min={1}
              max={5}
              step={1}
              icon={Bed}
              isMin={true}
            />
            <PreferenceSlider
              label="Minimum Bathrooms"
              value={mergedPreferences.overview.bathrooms}
              onChange={(newValue: any) =>
                updatePreference("overview.bathrooms", newValue)
              }
              min={1}
              max={5}
              step={1}
              icon={Bath}
              isMin={true}
            />
            <PreferenceSlider
              label="Minimum Size"
              extraLabel="sqm"
              value={mergedPreferences.overview.minSize}
              onChange={(newValue: any) =>
                updatePreference("overview.minSize", newValue)
              }
              min={20}
              max={200}
              step={5}
              icon={Ruler}
              isMin={true}
            />
          </CardContent>
        </Card>

        <Separator />

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          {Object.entries(mergedPreferences.details)
            .filter(([key]) => key !== "enabled")
            .map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <Switch
                  checked={value}
                  onCheckedChange={() => toggleDetail(key)}
                />
                <Label className="flex items-center gap-2">
                  {React.createElement(iconMap[key] || "div")}
                  {key}
                </Label>
              </div>
            ))}
        </div>

        <Separator />

        <DateRangePicker
          startDate={mergedPreferences.leaseDuration.moveInDateStart}
          onStartDateChange={(date: any) =>
            updatePreference("leaseDuration.moveInDateStart", date)
          }
        />
      </div>

      <div>
        <div className="sticky top-8">
          <AddressPreference
            address={mergedPreferences.location.address}
            setAddress={(newAddress: any) =>
              updatePreference("location.address", newAddress)
            }
            radius={mergedPreferences.location.radius}
            setRadius={(newRadius: any) =>
              updatePreference("location.radius", newRadius)
            }
          />
        </div>
      </div>
    </div>
  );
}
