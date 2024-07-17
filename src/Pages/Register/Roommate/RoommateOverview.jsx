import SelectOptions from "@/components/Coustom/Select";
import Input from "@/components/Coustom/Input";
import {
  Home,
  DollarSign,
  BedDouble,
  Bath,
  Maximize,
  Building,
  CalendarDays,
} from "lucide-react";

// const iconMap = {
//   rent: <DollarSign className="text-gray-400" size={32} />,
//   bedrooms: <BedDouble className="text-gray-400" size={32} />,
//   bathrooms: <Bath className="text-gray-400" size={32} />,
//   size: <Maximize className="text-gray-400" size={32} />,
//   floorNumber: <Building className="text-gray-400" size={32} />,
//   leaseLength: <CalendarDays className="text-gray-400" size={32} />,
// };
function RoommateOverview({ overview, handleInputChange, handleLeaseChange }) {
  const formatLabel = (feature) =>
    feature.charAt(0).toUpperCase() +
    feature.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className="grid grid-cols-4 gap-4 border p-4 rounded-sm">
      {Object.entries(overview).map(([key, value]) => (
        <div className="flex gap-4 items-center" key={key}>
          {/* {iconMap[key]} */}
          <Input
            label={formatLabel(key)}
            id={key}
            type={"number"}
            value={value}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <div className="flex gap-4 items-center w-full">
        {/* {iconMap.leaseLength} */}
        <SelectOptions
          label="Lease Length"
          options={["6 months", "1 year", "13"]}
          onChange={handleLeaseChange}
          value={overview.leaseLength}
        />
      </div>
    </div>
  );
}

export default RoommateOverview;
