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

export const PreferenceSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon: Icon,
}) => (
  <div className="flex flex-col gap-2">
    <Label className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Label>
    <Slider
      value={[value]}
      onValueChange={(newValue) => onChange(newValue[0])}
      min={min}
      max={max}
      step={step}
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>{min}</span>
      <span>{value}</span>
      <span>{max}</span>
    </div>
  </div>
);

export const MultiSelect = ({ label, options, selected, onChange }) => (
  <div className="flex flex-col gap-2">
    <Label>{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Badge
          key={option.value}
          variant={selected.includes(option.value) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => {
            const newSelected = selected.includes(option.value)
              ? selected.filter((item) => item !== option.value)
              : [...selected, option.value];
            onChange(newSelected);
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
  const [mapCenter, setMapCenter] = useState([32.0853, 34.7818]); // Tel Aviv coordinates

  const handleAddressChange = (value) => {
    setAddress({
      street: value.address.split(",")[0],
      city: value.address.split(",")[1],
      coordinates: value.position,
    });
    setMapCenter(value.position);
  };

  return (
    <Card className="mt-6 border-none">
      <CardHeader>
        <CardTitle>Location Preferences</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <LocationCombobox
            label="Preferred Address"
            placeholder="Enter address"
            onChange={handleAddressChange}
          />
        </div>
        <PreferenceSlider
          label="Search Radius (m)"
          value={radius}
          onChange={setRadius}
          min={100}
          max={5000}
          step={100}
          icon={MapPin}
        />
        <div className="h-full rounded-md overflow-hidden">
          <MapContent center={mapCenter} zoom={17}>
            <Marker position={mapCenter} />
            <Circle center={mapCenter} radius={radius } />
          </MapContent>
        </div>
      </CardContent>
    </Card>
  );
};

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Move-in Date Preference</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <Label>Preferred Move-in Date Range</Label>
      <div className="flex gap-4">
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
);
