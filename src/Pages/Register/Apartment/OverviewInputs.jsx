import SelectOptions from "@/components/Coustom/Select";
import Input from "@/components/Coustom/Input";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import { useEffect, useState } from "react";

const iconMap = {
  rent: <AddCardOutlinedIcon />,
  bedrooms: <BedOutlinedIcon />,
  bathrooms: <BathtubOutlinedIcon />,
  size: <FitScreenOutlinedIcon />,
  floorNumber: <ApartmentOutlinedIcon />,
  leaseLength: <HourglassBottomOutlinedIcon />,
  roommates: <Diversity3RoundedIcon />,
};
function OverviewInputs({
  overview,
  handleInputChange,
  handleLeaseChange,
  disabled = false,
}) {
  const [roommatesName, setRoommatesNames] = useState(overview.roommatesName || []);

  useEffect(() => {
    // Update roommatesName when overview.roommates changes
    const newRoommatesName = Array(Number(overview.roommates)).fill("");
    newRoommatesName[0] = "Me";
    setRoommatesNames(newRoommatesName);
  }, [overview.roommates]);

  const handleRoommateNameChange = (index, value) => {
    const updatedNames = [...roommatesName];
    updatedNames[index] = value;
    setRoommatesNames(updatedNames);
    handleInputChange({ target: { id: 'roommatesName', value: updatedNames } });
  };

  const formatLabel = (feature) =>
    feature.charAt(0).toUpperCase() +
    feature.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <>
      <div className={`grid grid-cols-2 gap-4 lg:grid-cols-3`}>
        <Input
          id="floorNumber"
          label={formatLabel("floorNumber")}
          icon={iconMap["floorNumber"]}
          type={"number"}
          value={overview["floorNumber"]}
          onChange={handleInputChange}
          placeholder="What floor is the apartment on?"
          disabled={disabled}
        />

        <Input
          id="rent"
          label={formatLabel("rent")}
          icon={iconMap["rent"]}
          type={"number"}
          value={overview["rent"]}
          onChange={handleInputChange}
          placeholder="How much is the rent per month?"
          disabled={disabled}
        />
        <Input
          id="bedrooms"
          label={formatLabel("bedrooms")}
          icon={iconMap["bedrooms"]}
          type={"number"}
          value={overview["bedrooms"]}
          onChange={handleInputChange}
          placeholder="How many bedrooms are there?"
          disabled={disabled}
        />
        <Input
          id="bathrooms"
          label={formatLabel("bathrooms")}
          icon={iconMap["bathrooms"]}
          type={"number"}
          value={overview["bathrooms"]}
          onChange={handleInputChange}
          placeholder="How many bathrooms are there?"
          disabled={disabled}
        />
        <Input
          id="size"
          label={formatLabel("size")}
          icon={iconMap["size"]}
          type={"number"}
          value={overview["size"]}
          onChange={handleInputChange}
          placeholder="How big is the apartment in sqm?"
          disabled={disabled}
        />

        <SelectOptions
          id="leaseLength"
          label="Lease Length"
          icon={iconMap.leaseLength}
          options={["6 months", "1 year", "1+"]}
          onChange={handleLeaseChange}
          value={overview.leaseLength}
          placeholder="How long is the lease?"
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col justify-center mx-auto">

      <Input
        id="roommates"
        label={formatLabel("roommates")}
        icon={iconMap["roommates"]}
        type={"number"}
        value={overview["roommates"]}
        onChange={handleInputChange}
        placeholder="How many roommates live here?"
        disabled={disabled}
      />
      </div>


      {overview.roommates > 1 && (
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4`}>
          {roommatesName.map((name, index) => (
            <Input
              key={index}
              label={`${index + 1}# Roommate`}
              type="text"
              value={name}
              placeholder={index === 0 ? "Me" : "Full Name"}
              onChange={(e) => handleRoommateNameChange(index, e.target.value)}
              disabled={index === 0}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default OverviewInputs;
