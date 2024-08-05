import { current } from "tailwindcss/colors";

const BASE_URL = "http://localhost:3001";

async function apiCall(endpoint, method = "GET", data = null, signal = null) {
  const url = `${BASE_URL}${endpoint}`;
  
  const options = {
    method,
    credentials: 'include',
    signal,
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    console.error(`Error response:`, await response.text());
    const error = new Error("An error occurred while making the request");
    error.code = response.status;
    error.info = await response.json().catch(() => ({}));
    throw error;
  }

  return response.json();
}

export const auth = {
  initiateGoogleAuth: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },
  currentUser: () => apiCall("/auth/current-user"),
  completeRoommateRegistration: (data) =>
    apiCall("/auth/register/complete/roommate", "POST", data),
  completeApartmentRegistration: (data) =>
    apiCall("/auth/register/complete/apartment", "POST", data),
  logout: () => apiCall("/auth/logout"),
};

// User functions
export const roommates = {
  getAll: () => apiCall(`/roommates`),
  get: (roommateId, signal) => apiCall(`/roommates/${roommateId}`, "GET", null, signal),
  update: (roommateId, roommateData) => apiCall(`/roommates/${roommateId}`, "PUT", roommateData),
  setPreferences: (updatedPreferences) => apiCall(`/roommates/set-preferences`, "PUT", updatedPreferences),
  delete: (roommateId) => apiCall(`/roommates/${roommateId}`, "DELETE"),
  getSuggestions: (roommateId, signal) =>
    apiCall(`/roommates/${roommateId}/suggestions`, "GET", null, signal),
  
  setAction : (apartmentId, action) => apiCall(`/roommates/set-action/${apartmentId}/?action=${action}`, "PUT"),

};

// Apartment functions
export const apartments = {
  getAll: () => apiCall(`/apartments`),
  setPreferences: (updatedPreferences) => apiCall(`/apartments/set-preferences`, "PUT", updatedPreferences),
  setAction : (roommateId, action) => apiCall(`/apartments/set-action/${roommateId}/?action=${action}`, "PUT"),
  delete: (apartmentId) => apiCall(`/apartments/${apartmentId}`, "DELETE"),
 
};
