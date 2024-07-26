import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PreferenceSlider,
  MultiSelect,
  AddressPreference,
  DateRangePicker,
} from "./PreferenceComponents";
import {
  Bed,
  Bath,
  DollarSign,
  Car,
  CalendarIcon,
  AirVent,
  ArrowUpDown,
  Dog,
  Cigarette,
  Sofa,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Separator } from "@/components/ui/separator";

const iconMap = [
  { label: "AC", icon: AirVent },
  { label: "Parking", icon: Car },
  { label: "Balcony", icon: ArrowUpDown },
  { label: "Furnished", icon: Sofa },
  { label: "Elevator", icon: ArrowUpDown },
  { label: "Pet Friendly", icon: Dog },
  { label: "Smoking Allowed", icon: Cigarette },
];

export default function ApartmentPreferences({ preferences, setPreferences }) {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 xl:gap-12">
      <div className="flex flex-col gap-6 sm:gap-8">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Apartment Preferences</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <PreferenceSlider
              label="Rent Range"
              extraLabel="₪ /month"
              value={preferences.rentRange}
              onChange={(newValue) =>
                setPreferences({ ...preferences, rentRange: newValue })
              }
              min={1000}
              max={10000}
              step={100}
              icon={DollarSign}
            />
            <div className="grid grid-cols-2 gap-4">
              <PreferenceSlider
                label="Bedrooms"
                value={preferences.bedrooms}
                onChange={(newValue) =>
                  setPreferences({ ...preferences, bedrooms: newValue })
                }
                min={1}
                max={5}
                step={1}
                icon={Bed}
              />
              <PreferenceSlider
                label="Bathrooms"
                value={preferences.bathrooms}
                onChange={(newValue) =>
                  setPreferences({ ...preferences, bathrooms: newValue })
                }
                min={1}
                max={3}
                step={1}
                icon={Bath}
              />
            </div>
            <PreferenceSlider
              label="Minimum Size"
              extraLabel="sqm"
              value={preferences.minSize}
              onChange={(newValue) =>
                setPreferences({ ...preferences, minSize: newValue })
              }
              min={20}
              max={200}
              step={5}
            />

            <div className="grid sm:grid-cols-2 grid-cols-1  gap-8">
              {iconMap.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  
                  <Switch
                    checked={preferences.details[item.label]}
                    onCheckedChange={(checked) =>
                      setPreferences({
                        ...preferences,
                        details: {
                          ...preferences.details,
                          [item.label]: checked,
                        },
                      })
                    }
                  />
                  <Label className="flex items-center gap-2">
                    {React.createElement(item.icon)}
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        <Separator/>

        <DateRangePicker
          startDate={preferences.moveInDateStart}
          endDate={preferences.moveInDateEnd}
          onStartDateChange={(date) =>
            setPreferences({ ...preferences, moveInDateStart: date })
          }
          onEndDateChange={(date) =>
            setPreferences({ ...preferences, moveInDateEnd: date })
          }
        >
          <PreferenceSlider
            label="Lease Duration"
            extraLabel="months"
            value={preferences.leaseDuration}
            onChange={(newValue) =>
              setPreferences({ ...preferences, leaseDuration: newValue })
            }
            min={1}
            max={24}
            step={1}
            icon={CalendarIcon}
          />
        </DateRangePicker>
      </div>

      <div>
        <div className="sticky top-8">
          <AddressPreference
            address={preferences.address}
            setAddress={(newAddress) =>
              setPreferences({ ...preferences, address: newAddress })
            }
            radius={preferences.radius}
            setRadius={(newRadius) =>
              setPreferences({ ...preferences, radius: newRadius })
            }
          />
        </div>
      </div>
    </div>
  );
}
