"use client";

// Define type for personal information in roommateExp
interface PersonalInfo {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  education: string;
  hometown: string;
}

// Define type for interests in roommateExp
interface Interests {
  hobbies: string[];
  music: string[];
  movies: string[];
  sports: string[];
}

// Define type for social information in roommateExp
interface SocialMedia {
  facebook: string;
  instagram: string;
}

interface Social {
  bio: string;
  profileImage: string;
  socialMedia: SocialMedia;
}

// Define type for roommateExp questions
interface Question {
  value: number;
  importance: number;
}

interface Questions {
  fitnessAndExerciseLevel: Question;
  sleepingPatterns: Question;
  cleanlinessLevel: Question;
  cleanlinessInCommonAreas: Question;
  socialBehavior: Question;
  politicalViews: Question;
}

// Define the type for roommateExp
interface RoommateExp {
  user: string;
  personalInfo: PersonalInfo;
  interests: Interests;
  social: Social;
  questions: Questions;
}

export const roommateExp: RoommateExp = {
  user: "60d5ecb74f421b0015c1f3a3",
  personalInfo: {
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    occupation: "Software Engineer",
    education: "Master's in Computer Science",
    hometown: "San Francisco, CA",
  },
  interests: {
    hobbies: ["hiking", "photography", "cooking", "yoga"],
    music: ["indie rock", "jazz", "electronic"],
    movies: ["sci-fi", "documentaries", "foreign films"],
    sports: ["rock climbing", "tennis", "swimming"],
  },
  social: {
    bio: "Tech enthusiast and outdoor adventurer looking for a like-minded roommate. I'm clean, respectful, and always up for a good conversation over coffee or a hike in the mountains.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socialMedia: {
      facebook: "https://www.facebook.com/janesmith",
      instagram: "https://www.instagram.com/jane.adventures",
    },
  },
  questions: {
    fitnessAndExerciseLevel: {
      value: 3,
      importance: 4,
    },
    sleepingPatterns: {
      value: 2,
      importance: 5,
    },
    cleanlinessLevel: {
      value: 4,
      importance: 3,
    },
    cleanlinessInCommonAreas: {
      value: 3,
      importance: 5,
    },
    socialBehavior: {
      value: 3,
      importance: 2,
    },
    politicalViews: {
      value: 1,
      importance: 1,
    },
  },
};

// Define types for apartmentExp
interface Address {
  street: string;
  city: string;
}

interface Location {
  address: Address;
  coordinates: [number, number]; // Latitude, Longitude
  nearbyPlaces: string[];
}

interface Specifications {
  size: number; // Square footage
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
}

interface Financials {
  rent: number;
  securityDeposit: number;
}

interface LeaseTerms {
  leaseDuration: string; // E.g., "12 months"
  availableFrom: string; // Date
}

interface ApartmentInfo {
  overview: {
    title: string;
    description: string;
    propertyType: string;
    totalCapacity: number;
    availableRooms: number;
  };
  location: Location;
  specifications: Specifications;
  financials: Financials;
  leaseTerms: LeaseTerms;
  roommates: string[]; // Array of user IDs
  images: string[]; // Array of image URLs
}

interface Amenities {
  general: string[];
  kitchen: string[];
  bathroom: string[];
  bedroom: string[];
  outdoor: string[];
  entertainment: string[];
  safety: string[];
}

interface ApartmentExp {
  user: string;
  info: ApartmentInfo;
  amenities: Amenities;
  details: Record<string, boolean>; // E.g., "AC", "Parking" as keys, boolean as values
}

export const apartmentExp: ApartmentExp = {
  user: "60d5ecb74f421b0015c1f3a1",
  info: {
    overview: {
      title: "Spacious Modern Apartment in Downtown",
      description:
        "A beautifully renovated apartment with stunning city views, perfect for young professionals or small families.",
      propertyType: "Apartment",
      totalCapacity: 4,
      availableRooms: 2,
    },
    location: {
      address: {
        street: "123 Main Street",
        city: "Metropolis",
      },
      coordinates: [40.7128, -74.006],
      nearbyPlaces: [
        "Central Park",
        "Metro Station",
        "Shopping Mall",
        "University",
      ],
    },
    specifications: {
      size: 1200,
      bedrooms: 3,
      bathrooms: 2,
      floorNumber: 5,
    },
    financials: {
      rent: 2500,
      securityDeposit: 3000,
    },
    leaseTerms: {
      leaseDuration: "12 months",
      availableFrom: "2023-09-01",
    },
    roommates: ['60d5ecb74f421b0015c1f3a3', '60d5ecb74f421b0015c1f3a4'],
    images: [
      "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1683769251695-963095b23d67?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
  },
  amenities: {
    general: ["High-speed Internet", "Central Heating", "Air Conditioning"],
    kitchen: ["Dishwasher", "Microwave", "Refrigerator", "Oven"],
    bathroom: ["Bathtub", "Shower", "Towel Warmer"],
    bedroom: ["Walk-in Closet", "Blackout Curtains"],
    outdoor: ["Balcony", "Garden Access"],
    entertainment: ["Cable TV", "Surround Sound System"],
    safety: ["24/7 Security", "Fire Alarm", "Smoke Detectors"],
  },
  details: {
    AC: true,
    Parking: true,
    Balcony: true,
    Furnished: false,
    Elevator: true,
    "Pet Friendly": true,
    "Smoking Allowed": false,
  },
};
