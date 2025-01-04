const BASE_URL = "http://localhost:3001";

// Define the HTTP method types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";


// Define the generic API call function
async function apiCall<T = any>(
  endpoint:string,
   method: HttpMethod = "GET",
    data:any = null,
     signal?: AbortSignal 
    ):Promise<T>{

  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    credentials: "include",
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
    const error: any = new Error("An error occurred while making the request");
    error.code = response.status;
    error.info = await response.json().catch(() => ({}));
    throw error;
  }

  return response.json();
}

// Auth-related API calls
export const auth = {
  testRoommate: () => apiCall("/auth/testRoommate"),
  testApartment: () => apiCall("/auth/testApartment"),
  initiateGoogleAuth: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },
  currentUser: () => apiCall("/auth/current-user"),
  completeRoommateRegistration: (data: Record<string,any>) =>
    apiCall("/auth/register/complete/roommate", "POST", data),
  completeApartmentRegistration: (data: Record<string,any>) =>
    apiCall("/auth/register/complete/apartment", "POST", data),
  logout: () => apiCall("/auth/logout"),
};

// User-related API calls
export const users = {
  suggestions: () => apiCall(`/users/suggestions`),
  matches: () => apiCall(`/users/matches`),
  activity: () => apiCall(`/users/activity`),

  update: (data: Record<string, any>) => apiCall(`/users/update`, "PUT", data),
  preferences: (preferences: Record<string, any>) =>
    apiCall(`/users/preferences`, "PUT", preferences),
  action: ({ id, action }: { id: string; action: string }) => {
    return apiCall(`/users/action/${id}/?action=${action}`, "PUT");
  },
};

// Roommate-related API calls
export const roommates = {
  getAll: () => apiCall(`/roommates`),
  update: (roommateData: Record<string, any>) =>
    apiCall(`/roommates/update-roommate`, "PUT", roommateData),
  setPreferences: (updatedPreferences: Record<string, any>) =>
    apiCall(`/roommates/set-preferences`, "PUT", updatedPreferences),
  setAction: (apartmentId: string, action: string) =>
    apiCall(`/roommates/set-action/${apartmentId}/?action=${action}`, "PUT"),
  getMetaches: () => apiCall(`/roommates/getMatches`),
};

// Apartment-related API calls
export const apartments = {
  getAll: () => apiCall(`/apartments`),
  setPreferences: (updatedPreferences: Record<string, any>) =>
    apiCall(`/apartments/set-preferences`, "PUT", updatedPreferences),
  setAction: (roommateId: string, action: string) =>
    apiCall(`/apartments/set-action/${roommateId}/?action=${action}`, "PUT"),
  update: (apartmentData: Record<string, any>) =>
    apiCall(`/apartments/update-apartment`, "PUT", apartmentData),
  delete: (apartmentId: string) => apiCall(`/apartments/${apartmentId}`, "DELETE"),
  getMetaches: () => apiCall(`/roommates/getMatches`),
};
