import React, { useState } from "react";
import { Slider } from "../../components/ui/slider";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { Card, CardContent,  } from "../../components/ui/card";
import { format } from "date-fns";
import { MapPin, CalendarIcon } from "lucide-react";
import MapContent from "../../components/Coustom/MapContent";
import { Marker, Circle } from "react-leaflet";
import LocationCombobox from "../../components/Coustom/locationCombobox";
import { cn } from "../../lib/utils";

interface RangeSliderProps {
  label: string;
  extraLabel?: string;
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  icon?: React.ElementType;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  extraLabel,
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
      value={value}
      onValueChange={(newValue) => onChange(newValue as [number, number])}
      min={min}
      max={max}
      step={step}
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>{min}</span>
      <span className="font-medium text-md text-black">
        {`${value[0]} - ${value[1]}`} <span>{extraLabel}</span>
      </span>
      <span>{max}</span>
    </div>
  </div>
);

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string; icon?: React.ElementType }[];
  value: string[];
  onChange: (newValue: string[]) => void;
  single?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  single = false,
}) => {
  const handleOptionClick = (optionValue: string) => {
    let newValue;
    if (single) {
      newValue = [optionValue];
    } else {
      newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
    }
    onChange(newValue);
  };

  const isSelected = (optionValue: string) => {
    return value.includes(optionValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option.value}
            variant={isSelected(option.value) ? "secondary" : "outline"}
            className={cn(
              "cursor-pointer text-blue-900 hover:bg-neutral-100",
              isSelected(option.value)
                ? "bg-blue-50 text-blue-900"
                : "border-blue-500"
            )}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.icon && <option.icon className="h-4 w-4 mr-1" />}
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

interface PreferenceSliderProps {
  label: string;
  extraLabel?: string;
  value: number;
  onChange: (newValue: number) => void;
  isMin?: boolean;
  min: number;
  max: number;
  step: number;
  icon?: React.ElementType;
}

export const PreferenceSlider: React.FC<PreferenceSliderProps> = ({
  label,
  extraLabel,
  value,
  onChange,
  isMin,
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
      onValueChange={(newValue: number[]) => onChange(newValue[0])}
      min={min}
      max={max}
      step={step}
      isMin={isMin}
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>{min}</span>
      <span className="font-medium text-md text-black">
        {value} <span>{extraLabel}</span>
      </span>
      <span>{max}+</span>
    </div>
  </div>
);

interface AddressPreferenceProps {
  address: {
    street: string;
    city: string;
    coordinates: [number, number];
  };
  setAddress: (newAddress: {
    street: string;
    city: string;
    coordinates: [number, number];
  }) => void;
  radius: number;
  setRadius: (newRadius: number) => void;
}

export const AddressPreference: React.FC<AddressPreferenceProps> = ({
  address,
  setAddress,
  radius,
  setRadius,
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([32.08, 34.84]);
  const [mapZoom, setMapZoom] = useState(12);

  const handleAddressChange = (value: { address: string; position: [number, number] } | null) => {
    if (value) {
      setAddress({
        street: value.address.split(",")[0],
        city: value.address.split(",")[1],
        coordinates: value.position,
      });
      setMapCenter(value.position);
      setMapZoom(15);
    } else {
      // Handle the case when value is null
      setAddress({
        street: "",
        city: "",
        coordinates: [0, 0],
      });
      setMapCenter([32.08, 34.84]);
      setMapZoom(12);
    }
  };

  return (
    <Card className="border-none shadow-none">
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
            {address?.street && <Marker position={address.coordinates} />}
            {address?.street && (
              <Circle center={address.coordinates} radius={radius} />
            )}
          </MapContent>
        </div>
      </CardContent>
    </Card>
  );
};

interface DateRangePickerProps {
  startDate: Date | null;
  onStartDateChange: (date: Date | undefined) => void;
  children?: React.ReactNode;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  onStartDateChange,
  children,
}) => (
  <Card className="border-none shadow-none">
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
            selected={startDate ?? undefined}
            onSelect={onStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {children}
    </CardContent>
  </Card>
);
