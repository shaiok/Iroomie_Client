import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Divider, Typography } from "@mui/material";

import LocationSearchWithMap from "@/Pages/Prefrences/LocationSearchWithMap";
import OverviewInputs from "./OverviewInputs";
import CheckboxesOptions from "@/components/Coustom/Checkbox";
import ComboboxSelectionsBadge from "@/components/Coustom/ComboboxSelectionsBadge";
import ImageUploadGrid from "@/components/Coustom/ImageUploadGrid";
import Input from "@/components/Coustom/Input";
import {
  amenitiesList,
  detailsList,
  nearbyPlacesList,
} from "@/lib/registerApartment";

export default function ApartmentInformation({ onSubmit }) {
  const [overview, setOverview] = useState({
    address: "",
    floorNumber: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    leaseLength: "",
    roommates: "",
    roommatesName: [],
  });
  const [amenities, setAmenities] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [about, setAbout] = useState("");
  const [details, setDetails] = useState({
    heating: false,
    parking: false,
    balcony: false,
    furnished: false,
    elevator: false,
    petFriendly: false,
    smokingAllowed: false,
  });
  const [img, setImg] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOverview((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id) => {
    setDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLeaseChange = (e) => {
    setOverview((prev) => ({ ...prev, leaseLength: e.target.value }));
  };

  const handleLocationChange = (newLocation) => {
    setOverview((prev) => ({ ...prev, address: newLocation }));
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ overview, amenities, nearbyPlaces, about, details, img });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-4xl font-extrabold lg:text-5xl h-40 flex items-center justify-center">
        Apartment Information
      </h1>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Location</Typography>
          </Divider>

          <LocationSearchWithMap
            onAddressChange={handleLocationChange}
            placeholder="Where is the apartment located?"
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Overview</Typography>
          </Divider>

          <OverviewInputs
            overview={overview}
            handleInputChange={handleInputChange}
            handleLeaseChange={handleLeaseChange}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Details</Typography>
          </Divider>

          <CheckboxesOptions
            onChange={handleCheckboxChange}
            selected={details}
            list={[...detailsList]}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Amenities</Typography>
          </Divider>

          <ComboboxSelectionsBadge
            selected={amenities}
            onChange={setAmenities}
            list={amenitiesList}
            placeholder="Select the amenities available in the apartment"
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Nearby Places</Typography>
          </Divider>

          <ComboboxSelectionsBadge
            selected={nearbyPlaces}
            onChange={setNearbyPlaces}
            list={nearbyPlacesList}
            placeholder="Select the nearby places to the apartment"
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">images</Typography>
          </Divider>
          <ImageUploadGrid onChange={setImg} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">About</Typography>
          </Divider>

          <Input
            type="textarea"
            multiline
            value={about}
            onChange={handleAboutChange}
            placeholder="Write a brief description about the apartment"
          />
        </div>

        <Button type="sumbit" className="w-full">
          Submit Apartment Information
        </Button>
      </div>
    </form>
  );
}
