"use client";

// Import icons from Material-UI
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import BalconyOutlinedIcon from '@mui/icons-material/BalconyOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';

import { SvgIconProps } from '@mui/material/SvgIcon';

// Define types for the details list
interface DetailItem {
  name: string;
  id: string;
  icon: React.ComponentType<SvgIconProps>; // Type for MUI icons
}

export const detailsList: DetailItem[] = [
  { name: "AC", id: "heating", icon: AcUnitOutlinedIcon },
  { name: "Parking", id: "parking", icon: LocalParkingOutlinedIcon },
  { name: "Balcony", id: "balcony", icon: BalconyOutlinedIcon },
  { name: "Furnished", id: "furnished", icon: ChairOutlinedIcon },
  { name: "Elevator", id: "elevator", icon: ElevatorOutlinedIcon },
  { name: "Pet Friendly", id: "petFriendly", icon: PetsOutlinedIcon },
  { name: "Smoking Allowed", id: "smokingAllowed", icon: SmokingRoomsOutlinedIcon },
];

// Define type for amenities list
interface AmenitiesList {
  [category: string]: string[];
}

export const amenitiesList: AmenitiesList = {
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
    "Soundbar System",
  ],
  "Climate Control": [
    "Individual Room Temperature Control",
    "Air Conditioning",
    "Ceiling Fans",
    "Fireplace",
    "Air Purifiers",
    "Humidifiers/Dehumidifiers",
    "Double-Pane Windows for Insulation",
  ],
  Laundry: [
    "In-Unit Washer/Dryer",
    "Laundry Room",
    "Clothes Drying Rack",
    "Ironing Board and Iron",
    "Laundry Detergent Subscription",
    "Laundry Scheduling App",
  ],
  Kitchen: [
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
    "Whiteboard for Grocery Lists",
  ],
  Outdoor: [
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
    "Outdoor Workout Area",
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
    "Guest Check-In System",
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
    "Noise-Cancelling Headphones",
  ],
  Convenience: [
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
    "Shared Subscription Services (Netflix, Spotify, etc.)",
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
    "Community Garden Plots",
  ],
  "Health & Wellness": [
    "On-Site Gym",
    "Sauna",
    "Swimming Pool",
    "Meditation Garden",
    "Spa Services",
    "Mental Health Resources",
    "Group Fitness Classes",
    "Wellness Workshops",
  ],
  Sustainability: [
    "Solar Panels",
    "Energy-Efficient Appliances",
    "Composting System",
    "Rainwater Harvesting",
    "Green Roof",
    "Eco-Friendly Cleaning Products",
    "Sustainable Transportation Options",
  ],
};

// Define the type for nearby places list
export const nearbyPlacesList = {
  "Nearby Places": [
    "Grocery Store",
    "Restaurant",
    "Cafe",
    "Park",
    "Gym",
    "Beach",
    "School",
    "Library",
    "Hospital",
    "Shopping Mall",
    "Bus Stop",
    "Train Station",
    "Pharmacy",
    "Bank",
    "Post Office",
    "Cinema",
  ],
};

// Define the type for general amenities list
export const generalAmenitiesList: AmenitiesList = {
  "Connectivity": [
    "High-speed Wi-Fi",
    "Fiber Optic Internet",
    "Multiple Ethernet Ports",
    "USB Charging Ports",
  ],
  "Smart Home": [
    "Smart Home Technology",
    "Keyless Entry",
    "Smart Locks",
    "Smart Lighting",
    "Thermostat Control",
  ],
  "Climate Control": [
    "Air Conditioning",
    "Ceiling Fans",
    "Fireplace",
    "Air Purifiers",
    "Humidifiers/Dehumidifiers",
    "Double-Pane Windows for Insulation",
  ],
  "Laundry": [
    "In-Unit Washer/Dryer",
    "Laundry Room",
    "Clothes Drying Rack",
    "Ironing Board and Iron",
  ],
  "Structure": [
    "High Ceilings",
    "Plank Flooring",
    "Built-In Shelving",
    "Mudroom",
    "Soundproof Walls",
    "Elevator",
    "Storage Units",
    "Wheelchair Accessibility",
  ],
  "Services": [
    "Utilities Included",
    "Weekly Cleaning Service",
    "On-Site Recycling",
    "Virtual Concierge",
    "On-Site Maintenance Team",
    "24/7 IT Support",
    "Pet-Friendly",
  ],
};

// Define the kitchen amenities list type
// kitchenAmenitiesList.js
export const kitchenAmenitiesList = {
  "Appliances": [
    "Dishwasher",
    "Microwave",
    "Refrigerator with Water/Ice Dispenser",
    "Stove/Oven",
    "Garbage Disposal",
    "Multiple Mini-Fridges",
    "Wine Cooler",
    "Instant Hot Water Dispenser",
    "Induction Cooktop",
    "Double Oven",
  ],
  "Surfaces": [
    "Granite Countertops",
    "Kitchen Island",
  ],
  "Storage": [
    "Pantry Space",
    "Individual Food Storage Areas",
    "Labeled Storage Containers",
  ],
  "Shared Spaces": [
    "Community Kitchen",
    "Coffee Bar",
    "Meal Prep Station",
  ],
  "Accessories": [
    "Shared Cooking Utensils and Appliances",
    "Whiteboard for Grocery Lists",
  ],
};

// bathroomAmenitiesList.js
export const bathroomAmenitiesList = {
  "Fixtures": [
    "Private Bathrooms",
    "Bathtub",
    "Walk-in Shower",
    "Dual Vanity Sinks",
    "Rain Showerhead",
    "Jacuzzi Tub",
    "Bidet",
  ],
  "Comfort": [
    "Heated Towel Racks",
    "Towel Warmers",
    "Hair Dryer",
  ],
  "Accessories": [
    "Lighted Makeup Mirror",
    "Waterproof Bluetooth Speakers",
  ],
  "Safety": [
    "Non-slip Flooring",
  ],
  "Storage": [
    "Ample Storage Space",
  ],
  "Lighting": [
    "Energy-efficient Lighting",
  ],
};

// bedroomAmenitiesList.js
export const bedroomAmenitiesList = {
  "Privacy": [
    "Private Bedrooms",
    "Blackout Curtains",
  ],
  "Comfort": [
    "Individual Thermostats",
    "Memory Foam Mattress",
    "Adjustable Bed Frame",
  ],
  "Storage": [
    "Walk-in Closet",
    "Built-in Wardrobe",
    "Under-bed Storage",
    "Personal Safes",
  ],
  "Workspace": [
    "Desk and Chair",
    "Reading Nook",
  ],
  "Accessories": [
    "Smart Alarm Clock",
    "Noise-Cancelling Headphones",
    "Full-length Mirror",
    "Bedside Charging Station",
  ],
};

// outdoorAmenitiesList.js
export const outdoorAmenitiesList = {
  "Relaxation": [
    "Balcony/Patio",
    "Roof Deck",
    "Garden/Courtyard",
    "Outdoor Seating Areas",
    "Hammocks",
  ],
  "Recreation": [
    "BBQ Area",
    "Outdoor Movie Projection Screen",
    "Communal Fire Pit",
    "Swimming Pool",
    "Hot Tub",
    "Tennis Court",
    "Basketball Court",
    "Playground",
  ],
  "Fitness": [
    "Outdoor Workout Area",
    "Jogging Trail",
    "Outdoor Yoga Space",
  ],
  "Pet-Friendly": [
    "Pet Areas",
  ],
  "Transportation": [
    "Bike Racks",
  ],
  "Community": [
    "Community Garden Plots",
    "Outdoor Kitchen",
  ],
};

// entertainmentAmenitiesList.js
export const entertainmentAmenitiesList = {
  "Media": [
    "Smart TV in Common Area",
    "Gaming Console",
    "Movie Theater Room",
    "Podcast Recording Booth",
  ],
  "Games": [
    "Game Room (Pool, Ping Pong, etc.)",
    "Board Game Collection",
    "Virtual Reality Room",
  ],
  "Arts": [
    "Art Studio",
    "Music Practice Room",
  ],
  "Social Spaces": [
    "Recreational Room",
    "Rooftop Lounge",
    "Community Events Space",
  ],
  "Relaxation": [
    "Communal Library",
    "Meditation Space",
  ],
  "Special Features": [
    "Karaoke Room",
  ],
  "Subscriptions": [
    "Shared Subscription Services (Netflix, Spotify, etc.)",
  ],
};

// safetyAmenitiesList.js
export const safetyAmenitiesList = {
  "Security Systems": [
    "24/7 Security",
    "Security Cameras",
    "Intercom System",
    "Fob Access to Common Areas",
  ],
  "Access Control": [
    "Secure Mail Room",
    "Guest Check-In System",
    "Gated Community",
  ],
  "Fire Safety": [
    "Fire Alarm System",
    "Sprinkler System",
  ],
  "Health & Emergency": [
    "Carbon Monoxide Detectors",
    "First Aid Kits",
    "Emergency Evacuation Plan",
    "Panic Buttons in Common Areas",
  ],
  "Personnel": [
    "On-site Security Personnel",
  ],
  "Storage Security": [
    "Secure Bike Storage",
  ],
};