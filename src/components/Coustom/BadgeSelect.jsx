import React from "react";
import { Badge } from "@/components/ui/badge";

const options = {
  "Internet & Tech": [
    "High-speed Wi-Fi",
    "Smart Home Technology",
    "Keyless Entry",
    "Smart Locks",
    "Smart Lighting",
    "Thermostat Control",
    "USB Charging Ports",
    "Fiber Optic Internet",
    "Multiple Ethernet Ports",
    "Smart TV in Common Area",
    "Gaming Console",
    "Dedicated Workspace with Ergonomic Setup",
    "Printer/Scanner",
    "Soundbar System"
  ],
  "Climate Control": [
    "Individual Room Temperature Control",
    "Air Conditioning",
    "Ceiling Fans",
    "Fireplace",
    "Air Purifiers",
    "Humidifiers/Dehumidifiers",
    "Double-Pane Windows for Insulation"
  ],
  "Laundry": [
    "In-Unit Washer/Dryer",
    "Laundry Room",
    "Clothes Drying Rack",
    "Ironing Board and Iron",
    "Laundry Detergent Subscription",
    "Laundry Scheduling App"
  ],
  "Kitchen": [
    "Dishwasher",
    "Microwave",
    "Refrigerator with Water/Ice Dispenser",
    "Stove/Oven",
    "Garbage Disposal",
    "Granite Countertops",
    "Community Kitchen",
    "Coffee Bar",
    "Pantry Space",
    "Individual Food Storage Areas",
    "Multiple Mini-Fridges",
    "Shared Cooking Utensils and Appliances",
    "Meal Prep Station",
    "Labeled Storage Containers",
    "Whiteboard for Grocery Lists"
  ],
  "Outdoor": [
    "Balcony/Patio",
    "BBQ Area",
    "Roof Deck",
    "Garden/Courtyard",
    "Outdoor Seating Areas",
    "Pet Areas",
    "Hammocks",
    "Outdoor Movie Projection Screen",
    "Communal Fire Pit",
    "Bike Racks",
    "Outdoor Workout Area"
  ],
  "Security & Access": [
    "24/7 Security",
    "Bike Storage",
    "Electric Vehicle Charging Stations",
    "Guest Parking",
    "Package Lockers",
    "Security Cameras",
    "Intercom System",
    "Fob Access to Common Areas",
    "Secure Mail Room",
    "Guest Check-In System"
  ],
  "Living Space": [
    "Shared Living Space",
    "Private Bedrooms",
    "Private Bathrooms",
    "Storage Units",
    "High Ceilings",
    "Plank Flooring",
    "Built-In Shelving",
    "Mudroom",
    "Soundproof Walls",
    "Flexible Furniture Arrangements",
    "Room Dividers for Privacy",
    "Blackout Curtains",
    "Individual Thermostats",
    "Personal Safes",
    "Noise-Cancelling Headphones"
  ],
  "Convenience": [
    "Utilities Included",
    "Weekly Cleaning Service",
    "On-Site Recycling",
    "Virtual Concierge",
    "Community Social Events",
    "Roommate Matching Service",
    "Shared Household Items Inventory",
    "Chore Schedule App",
    "Grocery Delivery Service",
    "Bill Splitting App Integration",
    "On-Site Maintenance Team",
    "24/7 IT Support",
    "Shared Subscription Services (Netflix, Spotify, etc.)"
  ],
  "Recreation & Community": [
    "Study Room",
    "Recreational Room",
    "Co-Working Space",
    "Fitness Center",
    "Yoga Studio",
    "Game Room (Pool, Ping Pong, etc.)",
    "Movie Theater Room",
    "Communal Library",
    "Podcast Recording Booth",
    "Art Studio",
    "Music Practice Room",
    "Meditation Space",
    "Rooftop Lounge",
    "Community Garden Plots"
  ],
  "Health & Wellness": [
    "On-Site Gym",
    "Sauna",
    "Swimming Pool",
    "Meditation Garden",
    "Spa Services",
    "Mental Health Resources",
    "Group Fitness Classes",
    "Wellness Workshops"
  ],
  "Sustainability": [
    "Solar Panels",
    "Energy-Efficient Appliances",
    "Composting System",
    "Rainwater Harvesting",
    "Green Roof",
    "Eco-Friendly Cleaning Products",
    "Sustainable Transportation Options"
  ]
};

const BadgeSelect = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-700">Amenities</label>
      {Object.entries(options).map(([category, amenities]) => (
        <div key={category} className="flex flex-col gap-2">
          <h3 className="text-md ">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {amenities.map((option) => (
              <Badge
                key={option}
                variant={selected.includes(option) ? "default" : "outline"}
                className={`cursor-pointer py-1 px-1.5 ${
                  selected.includes(option)
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-50 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => onChange(option)}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeSelect;
