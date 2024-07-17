import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import LocationSearchWithMap from "./LocationSearchWithMap";
import RangeSlider from "./RangeSlider";
import DateSelection from "./DateSelection";

function Filter() {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(0);
  const [date, setDate] = useState(null);
  const [rentRange, setRentRange] = useState([0, 8000]);
  const [roommatesRange, setRoomatesRange] = useState([0, 5]);
  const [sexualPref, setSexualPref] = useState([3]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      address,
      radius: parseFloat(radius.toFixed(1)), // Ensure radius is a number with one decimal place
      date: date instanceof Date ? format(date, "PPP") : date, // Format date if it's a Date object
      rentRange,
      roommatesRange,
      sexualPref,
    };
    console.log("Chosen filters:", filters);
  };

  const handleReset = () => {
    setAddress("");
    setRadius(0);
    setDate(null);
    setRentRange([0, 8000]);
    setRoomatesRange([0, 5]);
    setSexualPref([3]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 text-center lg:p-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col gap-8">
          <LocationSearchWithMap
            onAddressChange={setAddress}
            onRadiusChange={setRadius}
            withRadius={true}
          />
        </div>

        <div className="flex flex-col gap-8 lg:justify-between">
          <RangeSlider
            value={rentRange}
            onChange={setRentRange}
            min={0}
            max={8000}
            step={100}
            label="Rent Range per Month"
            type={"₪"}
          />
          <RangeSlider
            value={roommatesRange}
            onChange={setRoomatesRange}
            min={1}
            max={5}
            step={1}
            label="Number of Roomates"
          />
          <RangeSlider
            value={sexualPref}
            onChange={setSexualPref}
            min={1}
            max={3}
            step={1}
            label="Sexual Preference"
            map={{ 1: "men", 2: "women", 3: "no preference" }}
          />
        </div>
      </div>
      <DateSelection value={date} onChange={setDate} />

      <div className="flex flex-col lg:flex-row gap-8">
        <Button
          type="button"
          className="w-full bg-transparent border text-black"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit" className="w-full">
          Update
        </Button>
      </div>
    </form>
  );
}

export default Filter;
