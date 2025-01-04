"use client";

import React, { useState } from "react";
import SeparatorWithLabel from "../../components/Coustom/separatorWithLabel";
import InputWithLabel from "../../components/Coustom/inputWithLabel";
import SelectWithLabel from "../../components/Coustom/selectWithLabel";
import CategorizedBadgeSelect from "../../components/Coustom/bageCombobox";
import TextareaWithLabel from "../../components/Coustom/textareaWithLabel";
import {
  nearbyPlacesList,
} from "../../lib/registerApartment";
import {
  Home,
  Users,
  ScrollText,
} from "lucide-react";
import LocationCombobox from "../../components/Coustom/locationCombobox";



const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

interface ApartmentProfileFormProps {
  onSubmit: (profile: any) => void;
  initialData?: any;
}

interface ProfileState {
  info: {
    overview: {
      title: string;
      description: string;
      propertyType: string;
      totalCapacity: string;
      availableRooms: string;
    };
    location: {
      address: {
        street: string;
        city: string;
      };
      coordinates: [number, number];
      nearbyPlaces: string[];
    };
    specifications: {
      size: string;
      bedrooms: string;
      bathrooms: string;
      floorNumber: string;
    };
    financials: {
      rent: string;
      securityDeposit: string;
    };
    leaseTerms: {
      leaseDuration: string;
      availableFrom: string;
    };
    images: string[];
  };
  amenities: {
    general: string[];
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
    outdoor: string[];
    entertainment: string[];
    safety: string[];
  };
  details: {
    AC: boolean;
    Parking: boolean;
    Balcony: boolean;
    Furnished: boolean;
    Elevator: boolean;
    "Pet Friendly": boolean;
    "Smoking Allowed": boolean;
  };
}

const ApartmentProfileForm: React.FC<ApartmentProfileFormProps> = ({
  onSubmit,
  initialData = {},
}) => {
  const [profile, setProfile] = useState<ProfileState>({
    info: {
      overview: {
        title: initialData.info?.overview?.title || "",
        description: initialData.info?.overview?.description || "",
        propertyType: initialData.info?.overview?.propertyType || "",
        totalCapacity: initialData.info?.overview?.totalCapacity || "",
        availableRooms: initialData.info?.overview?.availableRooms || "",
      },
      location: {
        address: {
          street: initialData.info?.location?.address?.street || "",
          city: initialData.info?.location?.address?.city || "",
        },
        coordinates: initialData.info?.location?.coordinates || ["", ""],
        nearbyPlaces: initialData.info?.location?.nearbyPlaces || [],
      },
      specifications: {
        size: initialData.info?.specifications?.size || "",
        bedrooms: initialData.info?.specifications?.bedrooms || "",
        bathrooms: initialData.info?.specifications?.bathrooms || "",
        floorNumber: initialData.info?.specifications?.floorNumber || "",
      },
      financials: {
        rent: initialData.info?.financials?.rent || "",
        securityDeposit: initialData.info?.financials?.securityDeposit || "",
      },
      leaseTerms: {
        leaseDuration: initialData.info?.leaseTerms?.leaseDuration || "",
        availableFrom: formatDate(initialData.info?.leaseTerms?.availableFrom) || "",
      },
      images: initialData.info?.images || [],
    },
    amenities: {
      general: initialData.amenities?.general || [],
      kitchen: initialData.amenities?.kitchen || [],
      bathroom: initialData.amenities?.bathroom || [],
      bedroom: initialData.amenities?.bedroom || [],
      outdoor: initialData.amenities?.outdoor || [],
      entertainment: initialData.amenities?.entertainment || [],
      safety: initialData.amenities?.safety || [],
    },
    details: {
      AC: initialData.details?.AC || false,
      Parking: initialData.details?.Parking || false,
      Balcony: initialData.details?.Balcony || false,
      Furnished: initialData.details?.Furnished || false,
      Elevator: initialData.details?.Elevator || false,
      "Pet Friendly": initialData.details?.["Pet Friendly"] || false,
      "Smoking Allowed": initialData.details?.["Smoking Allowed"] || false,
    },
  });

  const initialAddress = initialData.info?.location?.address
    ? `${initialData.info.location.address.street}, ${initialData.info.location.address.city}`
    : "";

  console.log("Initial Data:", profile);


  const handleNestedInputChange = (
    section: keyof ProfileState,
    nestedSection: keyof ProfileState["info"],
    field: string,
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...(prev[section] as any)[nestedSection], // Type assertion to help TypeScript understand the structure
          [field]: value,
        },
      },
    }));
  };

  const handleLocationChange = (
    newValue: { address: string; position: [number, number] } | null
  ) => {
    setProfile((prev) => {
      // Checking for null and properly updating the state
      if (newValue) {
        return {
          ...prev,
          info: {
            ...prev.info,
            location: {
              ...prev.info.location,
              address: {
                street: newValue.address.split(",")[0],
                city: newValue.address.split(",")[1],
              },
              coordinates: newValue.position, // Now using [number, number]
            },
          },
        };
      } else {
        return prev; // In case of null, we don't update the profile
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center py-4">
      <h2 className="lg:h-32 h-20 flex items-center">Apartment Profile</h2>

      <main className="w-full flex flex-col gap-8 p-4 max-w-4xl">
        <SeparatorWithLabel label="Overview" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <InputWithLabel
            icon={<Home />}
            type="text"
            id="title"
            label="Title"
            value={profile.info.overview.title}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "title",
                e.target.value
              )
            }
          />
          <SelectWithLabel
            icon={<Home />}
            value={profile.info.overview.propertyType}
            label="Property Type"
            options={["House", "Apartment", "Studio", "Other"]}
            onChange={(e) =>
              handleNestedInputChange("info", "overview", "propertyType", e)
            }
          />
          <InputWithLabel
            icon={<Users />}
            type="number"
            id="totalCapacity"
            label="Total Capacity"
            value={profile.info.overview.totalCapacity}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "totalCapacity",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Users />}
            type="number"
            id="availableRooms"
            label="Available Rooms"
            value={profile.info.overview.availableRooms}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "availableRooms",
                e.target.value
              )
            }
          />
          <div className="lg:col-span-2">
            <TextareaWithLabel
              icon={<ScrollText />}
              id="description"
              label="Description"
              value={profile.info.overview.description}
              onChange={(e) =>
                handleNestedInputChange(
                  "info",
                  "overview",
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </section>

        <SeparatorWithLabel label="Location" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <LocationCombobox
            label="Address"
            placeholder="Enter address"
            onChange={handleLocationChange}
            initialValue={initialAddress}
          />

          <CategorizedBadgeSelect
            icon={<Home />}
            id="nearbyPlaces"
            label="Nearby Places"
            options={nearbyPlacesList}
            value={profile.info.location.nearbyPlaces}
            onChange={(newValue) =>
              handleNestedInputChange(
                "info",
                "location",
                "nearbyPlaces",
                newValue
              )
            }
          />
        </section>
      </main>

      <button
        className="my-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Submit Apartment Profile
      </button>
    </form>
  );
};




export default ApartmentProfileForm;

