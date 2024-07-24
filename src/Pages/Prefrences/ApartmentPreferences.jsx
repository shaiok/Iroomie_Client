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
  Coffee,
  Car,
  CalendarIcon,
  AirVent,
  Dumbbell,
  Waves,
  ArrowUpDown,
  Dog,
  Wifi,
  Tv,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ApartmentPreferences = ({ preferences, setPreferences }) => {
  return (
    <>
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Apartment Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <PreferenceSlider
            label="Rent Range (₪)"
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
            label="Minimum Size (sqm)"
            value={preferences.minSize}
            onChange={(newValue) =>
              setPreferences({ ...preferences, minSize: newValue })
            }
            min={20}
            max={200}
            step={5}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Furnished
              </Label>
              <Switch
                checked={preferences.furnished}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, furnished: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Parking
              </Label>
              <Switch
                checked={preferences.parking}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, parking: checked })
                }
              />
            </div>
          </div>
          <MultiSelect
            label="Amenities"
            options={[
              {
                value: "AirConditioning",
                label: "Air Conditioning",
                icon: AirVent,
              },
              { value: "Balcony", label: "Balcony", icon: Coffee },
              { value: "Gym", label: "Gym", icon: Dumbbell },
              { value: "Pool", label: "Pool", icon: Waves },
              { value: "Elevator", label: "Elevator", icon: ArrowUpDown },
              { value: "PetFriendly", label: "Pet-friendly", icon: Dog },
              { value: "Wifi", label: "Wi-Fi", icon: Wifi },
              { value: "TV", label: "TV", icon: Tv },
            ]}
            selected={preferences.amenities}
            onChange={(newValue) =>
              setPreferences({ ...preferences, amenities: newValue })
            }
          />
          <PreferenceSlider
            label="Lease Duration (months)"
            value={preferences.leaseDuration}
            onChange={(newValue) =>
              setPreferences({ ...preferences, leaseDuration: newValue })
            }
            min={1}
            max={24}
            step={1}
            icon={CalendarIcon}
          />
        </CardContent>
      </Card>
      
      <DateRangePicker
        startDate={preferences.moveInDateStart}
        endDate={preferences.moveInDateEnd}
        onStartDateChange={(date) =>
          setPreferences({ ...preferences, moveInDateStart: date })
        }
        onEndDateChange={(date) =>
          setPreferences({ ...preferences, moveInDateEnd: date })
        }
      />
    </>
  );
};

export default ApartmentPreferences;
