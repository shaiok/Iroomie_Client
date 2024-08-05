import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { MapPin, CalendarIcon } from "lucide-react";
import MapContent from "@/components/Coustom/MapContent";
import { Marker, Circle } from "react-leaflet";
import LocationCombobox from "@/components/Coustom/locationCombobox";
import { cn } from "@/lib/utils";

export const PreferenceSlider = ({
    label,
    extraLabel,
    value,
    onChange,
    min,
    max,
    step,
    icon: Icon,
    isRange = false,
  }) => (
    <div className="flex flex-col gap-2">
      <Label className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Label>
      <Slider
        value={isRange ? value : [value]}
        onValueChange={(newValue) => onChange(isRange ? newValue : newValue[0])}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={1}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{min}</span>
        <span className="font-medium text-md text-black">
          {isRange ? `${value[0]} - ${value[1]}` : value} <span>{extraLabel}</span>
        </span>
        <span>{max}</span>
      </div>
    </div>
  );

  
  export const MultiSelect = ({ label, options, selected, single = false, onChange }) => (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option.value}
            variant={selected.includes(option.value) ? "secondary" : "outline"}
            className={cn(
              "cursor-pointer text-blue-900 hover:bg-neutral-100",
              selected.includes(option.value) ? "bg-blue-50 text-blue-900" : "border-blue-500"
            )}
            onClick={() => {
              if (single) {
                // For single selection, just replace the entire selection
                onChange([option.value]);
              } else {
                // For multiple selection, toggle the selected item
                const newSelected = selected.includes(option.value)
                  ? selected.filter((item) => item !== option.value)
                  : [...selected, option.value];
                onChange(newSelected);
              }
            }}
          >
            {option.icon && <option.icon className="h-4 w-4 mr-1" />}
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
export const AddressPreference = ({
  address,
  setAddress,
  radius,
  setRadius,
}) => {
  const [mapCenter, setMapCenter] = useState([32.08, 34.84]);
  const [mapZoom, setMapZoom] = useState(12);


  const handleAddressChange = (value) => {
    setAddress({
      street: value.address.split(",")[0],
      city: value.address.split(",")[1],
      coordinates: value.position,
    });
    setMapCenter(value.position);
    setMapZoom(15);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Location Preferences</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <LocationCombobox
          label="Preferred Address"
          placeholder="Enter address"
          onChange={handleAddressChange}
        />
        <PreferenceSlider
          label="Search Radius (m)"
          value={radius}
          onChange={setRadius}
          min={100}
          max={1000}
          step={100}
          icon={MapPin}
        />

        <div className="h-96 rounded-xl overflow-auto ">
          <MapContent center={mapCenter} zoom={mapZoom}>
            {address.street && <Marker position={mapCenter} />}
            {address.street && <Circle center={mapCenter} radius={radius} />}
          </MapContent>
        </div>
      </CardContent>
    </Card>
  );
};

export const DateRangePicker = ({ startDate, onStartDateChange, children }) => (
  <Card className="border-none shadow-none">
    <CardHeader>
      <CardTitle>Move-in Date</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col  gap-4">
      <Label>Preferred Move-in Date</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : "From"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={onStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {children}
    </CardContent>
  </Card>
);
