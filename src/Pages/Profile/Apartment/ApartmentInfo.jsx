import OverviewInputs from "@/Pages/Register/Apartment/OverviewInputs";
import MapContent from "@/components/Coustom/MapContent";
import { Divider, Typography } from "@mui/material";
import React from "react";
import CheckboxesOptions from "@/components/Coustom/Checkbox";
import { detailsList } from "@/lib/registerApartment";
import ComboboxSelectionsBadge from "@/components/Coustom/ComboboxSelectionsBadge";
import RoommatesAvatar from "@/components/Coustom/RoomatesAvatar";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import { CarouselImages } from "@/components/Coustom/Carousel";

const getOrdinalSuffix = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return number + "st";
  }
  if (j === 2 && k !== 12) {
    return number + "nd";
  }
  if (j === 3 && k !== 13) {
    return number + "rd";
  }
  return number + "th";
};

const roomInfo = (data) => {
  return {
    Rent: {
      val: `${data.rent}$ Rent /month`,
      icon: AddCardOutlinedIcon,
    },
    Bedroom: {
      val: `${data.bedrooms} Bedroom${data.bedrooms > 1 ? "s" : ""}`,
      icon: BedOutlinedIcon,
    },
    Bathroom: {
      val: `${data.bathrooms} Bathroom${data.bathrooms > 1 ? "s" : ""}`,
      icon: BathtubOutlinedIcon,
    },
    Size: {
      val: `${data.size} sqm`,
      icon: FitScreenOutlinedIcon,
    },
    Floor: {
      val: `${getOrdinalSuffix(data.floorNumber)} Floor`,
      icon: ApartmentOutlinedIcon,
    },
    Lease: {
      val: `${data.leaseLength} Lease`,
      icon: HourglassBottomOutlinedIcon,
    },
    Roommate: {
      val: `${data.roommates} roommate${data.roommates > 1 ? "s" : ""}`,
      icon: Diversity3RoundedIcon,
    },
  };
};

const InfoItem = ({ icon: Icon, value }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <Icon className="text-blue-700" />
    <p className="capitalize tracking-wide">{value}</p>
  </div>
);

export default function ApartmentInfo({ data }) {

  const room = roomInfo(data);

  return (
    <main className="flex flex-col pb-8 text-sm">
      <h1 className="h-32 lg:h-40 text-4xl font-extrabold lg:text-5xl flex items-center justify-center text-gray-800">
        Apartment Information
      </h1>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">
              {data.address.address}
            </Typography>
          </Divider>

          <MapContent center={[...data.address.position]} zoom={17} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Overview</Typography>
          </Divider>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 ">
            {Object.entries(room).map(([key, info], index) => (
              <InfoItem key={key} value={info.val} icon={info.icon} />
            ))}
          </div>
          <RoommatesAvatar />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Details</Typography>
          </Divider>

          <CheckboxesOptions selected={data.details} list={[...detailsList]} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Amenities</Typography>
          </Divider>

          <ComboboxSelectionsBadge
            selected={data.amenities}
            previewOnly={true}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Nearby Places</Typography>
          </Divider>

          <ComboboxSelectionsBadge
            selected={data.nearbyPlaces}
            previewOnly={true}
          />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">Images</Typography>
          </Divider>
          <CarouselImages images={data.images} />
        </div>

        <div className="flex flex-col gap-12">
          <Divider>
            <Typography color="textSecondary">About</Typography>
          </Divider>

          <p type="textarea" className="text-gray-800">
            {data.about}
          </p>
        </div>
      </div>
    </main>
  );
}
