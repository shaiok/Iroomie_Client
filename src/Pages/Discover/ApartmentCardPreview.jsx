import { Card } from "@/components/ui/card";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import ApartmentInfo from "../Profile/Apartment/ApartmentInfo";
import AnimatedModal from "@/components/Coustom/AnimatedModal";

const apartmentPreview = (apartmentDetails) => {
  return {
    location: apartmentDetails.address.address.length > 35
    ? apartmentDetails.address.address.substring(0, 32) + " ..."
    : apartmentDetails.address.address,

    
    img: apartmentDetails.images[0],
    rent: `$${apartmentDetails.rent}/month`,

    bedrooms: { val: apartmentDetails.bedrooms, label: `bedrooms` },
    bathrooms: {
      val: apartmentDetails.bathrooms,
      label: `bathrooms`,
    },
    size: { val: apartmentDetails.size, label: `sqm` },
    leaseLength: { val: apartmentDetails.leaseLength.slice(0, apartmentDetails.leaseLength.indexOf(" ")) , label: `months` },
    roommates: {
      val: apartmentDetails.roommates,
      label: `roommate${apartmentDetails.roommates > 1 ? "s" : ""}`,
    },

    aboutExcerpt:
      apartmentDetails.about.length > 100
        ? apartmentDetails.about.substring(0, 97) + "..."
        : apartmentDetails.about,
    keyDetails: Object.fromEntries(
      Object.entries(apartmentDetails.details).filter(
        ([key, value]) => value === true
      )
    ),
  };
};

const RoomInfoItem = ({ icon: Icon, val, label }) => (
  <div className="flex items-center gap-2 justify-center">
    <Icon className="w-5 h-5 text-blue-500" />
    <div className="flex text-sm items-center gap-1 text-gray-700">
      <span>{val}</span>
      {label && <span className="text-xs text-gray-500 flex items-end">{label}</span>}
    </div>
    
  </div>
);

export default function ApartmentPreview({ data }) {
  const apartment = apartmentPreview(data);
  return (
    <Card className="max-w-4xl  overflow-hidden shadow-lg rounded-2xl bg-white relative flex flex-col lg:flex-row">
      <section className="lg:w-2/5 lg:h-72 w-full h-1/2">
        <img
          src={apartment.img || "/placeholder-apartment.jpg"}
          alt={`${apartment.location} apartment`}
          className="w-full h-full object-cover object-center"
        />
      </section>

      <section className="flex flex-col justify-between  p-4 mb-8 lg:w-3/5">
        <div className="flex justify-between lg:flex-row flex-col items-center gap-4">
          <h2 className="lg:text-xl text-lg font-medium text-gray-800 ">
            {apartment.location}
          </h2>
          {apartment.roommates.val && <span className="text-gray-500 text-sm lg:text-md">
            ({apartment.roommates.val} {apartment.roommates.label})
          </span>}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">
          <RoomInfoItem 
            icon={BedOutlinedIcon} 
            val={apartment.bedrooms.val}
            label={apartment.bedrooms.label} 
          />
          <RoomInfoItem
            icon={BathtubOutlinedIcon}
            val={apartment.bathrooms.val}
            label={apartment.bathrooms.label}
          />
          <RoomInfoItem
            icon={FitScreenOutlinedIcon}
            val={apartment.size.val}
            label={apartment.size.label}
          />
          <RoomInfoItem
            icon={HourglassBottomOutlinedIcon}
            val={apartment.leaseLength.val}
            label={apartment.leaseLength.label}
          />
        </div>

        <p className="text-gray-800 mb-6">{apartment.aboutExcerpt}</p>
      </section>

      <div className="absolute bottom-0 right-0">
        <AnimatedModal label={apartment.rent}>
          <ApartmentInfo data={data} />
        </AnimatedModal>
      </div>
    </Card>
  );
}
