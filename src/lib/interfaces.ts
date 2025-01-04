export interface IUser {
  id: any;
  email: string;
  password?: string;
  googleId?: string;
  fullName?: string;
  userType: "roommate" | "apartment" | "pending";
  picture?: string;
  profile?: IRoommate | IApartment; 
}

export interface IRoommate {
 
  questionnaire?: IQuestion;
  personalInfo?: {
    name?: string;
    age?: number;
    gender?: string;
    occupation?: string;
    education?: string;
    hometown?: string;
  };
  interests?: {
    hobbies?: string[];
    music?: string[];
    movies?: string[];
    sports?: string[];
  };
  social?: {
    bio?: string;
    profileImage?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
    };
  };
  preferences?: {
    overview?: {
      rentRange?: number;
      bedrooms?: number;
      bathrooms?: number;
      minSize?: number;
    };
    details?: {
      AC?: boolean;
      Parking?: boolean;
      Balcony?: boolean;
      Furnished?: boolean;
      Elevator?: boolean;
      "Pet Friendly"?: boolean;
      "Smoking Allowed"?: boolean;
    };
    leaseDuration?: {
      duration?: number;
      moveInDateStart?: Date;
    };
    location?: {
      address?: {
        street?: string;
        city?: string;
        coordinates?: [number, number];
      };
      radius?: number;
    };
  };
  likes?: string[];
  dislikes?: string[];
  matches?: string[];
}

export interface IApartment {
  questionnaire?: IQuestion;
  info?: {
    overview?: {
      title?: string;
      description?: string;
      propertyType?: string;
      totalCapacity?: number;
      availableRooms?: number;
    };

    location?: {
      address?: {
        street?: string;
        city?: string;
      };
      coordinates?: [number, number];
      nearbyPlaces?: string[];
    };
    specifications?: {
      size?: number;
      bedrooms?: number;
      bathrooms?: number;
      floorNumber?: number;
    };
    roommates?: string[];
    financials?: {
      rent?: number;
      securityDeposit?: number;
    };
    leaseTerms?: {
      leaseDuration?: string;
      availableFrom?: Date;
    };
    images?: string[];
  };
  amenities?: {
    general?: string[];
    kitchen?: string[];
    bathroom?: string[];
    bedroom?: string[];
    outdoor?: string[];
    entertainment?: string[];
    safety?: string[];
  };
  details?: {
    AC?: boolean;
    Parking?: boolean;
    Balcony?: boolean;
    Furnished?: boolean;
    Elevator?: boolean;
    "Pet Friendly"?: boolean;
    "Smoking Allowed"?: boolean;
  };
  preferences?: {
    ageRange?: [number, number];
    gender?: string[];
    occupations?: string[];
    sharedInterests?: string[];
  };
  likes?: string[];
  dislikes?: string[];
  matches?: string[];
}

export interface IQuestion {
  [key: string]: {
    value: number;
    importance: number;
  };
}

export type VoteType = "like" | "dislike" | "match";
