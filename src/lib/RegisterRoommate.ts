// Define types for categorized lists
export interface CategorizedList {
  [category: string]: string[];
}

export interface Occupation {
  title: string;
  category: string;
}

// Define hobbies list
export const hobbiesList: CategorizedList = {
  "Arts & Crafts": [
    "Painting",
    "Drawing",
    "Sculpting",
    "Pottery",
    "Knitting",
    "Crocheting",
    "Embroidery",
    "Scrapbooking",
    "Jewelry Making",
    "Woodworking",
    "Origami",
    "Calligraphy",
    "Sewing",
    "Candle Making",
    "Soap Making",
  ],
  "Music & Dance": [
    "Playing an Instrument",
    "Singing",
    "DJing",
    "Composing Music",
    "Ballroom Dancing",
    "Salsa Dancing",
    "Hip Hop Dancing",
    "Ballet",
    "Tap Dancing",
    "Swing Dancing",
    "Line Dancing",
    "Belly Dancing",
    "Irish Dancing",
    "Bollywood Dancing",
    "Flamenco Dancing",
  ],
  // ... (other categories as in the original list)
};

// Define education list
export const educationList: string[] = [
  "No formal education",
  "Primary school",
  "Middle school",
  "High school",
  "Vocational school",
  "Some college, no degree",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctoral degree",
  "Professional degree",
];

// Define occupation list
export const occupationList: Occupation[] = [
  { title: "Accountant", category: "Business & Finance" },
  { title: "Business Analyst", category: "Business & Finance" },
  { title: "Consultant", category: "Business & Finance" },
  // ... (other occupations as in the original list)
];

// Define music genres list
export const musicGenresList: CategorizedList = {
  "Popular": ["Pop", "Rock", "Hip Hop", "R&B", "Country", "EDM", "Latin"],
  "Classical & Jazz": ["Classical", "Jazz", "Blues", "Opera"],
  // ... (other categories as in the original list)
};

// Define movie genres list
export const movieGenresList: CategorizedList = {
  "Action & Adventure": [
    "Action",
    "Adventure",
    "Superhero",
    "Spy",
    "Martial Arts",
  ],
  "Comedy": ["Romantic Comedy", "Slapstick", "Satire", "Black Comedy"],
  // ... (other categories as in the original list)
};

// Define sports list
export const sportsList: CategorizedList = {
  "Team Sports": ["Football", "Basketball", "Baseball", "Soccer", "Volleyball", "Hockey"],
  "Individual Sports": ["Tennis", "Golf", "Swimming", "Athletics", "Gymnastics"],
  // ... (other categories as in the original list)
};
