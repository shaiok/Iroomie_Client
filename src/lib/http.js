//option1
// const BASE_URL = "http://localhost:3001";

// // Utility function for API calls
// async function apiCall(endpoint, method = "GET", data = null, signal = null) {
//   const url = `${BASE_URL}${endpoint}`;
//   const options = {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     signal,
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

// console.log("url", url);
// console.log("options", options);
//   const response = await fetch(url, options);

//   if (!response.ok) {
//     const error = new Error("An error occurred while making the request");
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   return response.json();
// }

const BASE_URL = "http://localhost:3001";

// Updated utility function for API calls
async function apiCall(endpoint, method = "GET", data = null, signal = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    signal,
  };

  if (data instanceof FormData) {
    // If data is FormData, don't set Content-Type (browser will set it with boundary)
    options.body = data;
  } else if (data) {
    // For JSON data
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error("An error occurred while making the request");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}


// Auth functions
export const auth = {
  registerApartment: (apartmentData) =>
    apiCall("/auth/register/apartment", "POST", apartmentData),
  registerUser: (userData) => apiCall("/auth/register/user", "POST", userData),
  login: (credentials) => apiCall("/auth/login", "POST", credentials),
  logout: () => apiCall("/auth/logout"),
};

// User functions
export const users = {
  getAll: () => apiCall(`/users`),
  get: (userId, signal) => apiCall(`/users/${userId}`, "GET", null, signal),
  update: (userId, userData) => apiCall(`/users/${userId}`, "PUT", userData),
  delete: (userId) => apiCall(`/users/${userId}`, "DELETE"),
  getSuggestions: (userId, signal) =>
    apiCall(`/users/${userId}/suggestions`, "GET", null, signal),
  associateToApartment: (userId, apartmentId) =>
    apiCall(`/users/${userId}/${apartmentId}`, "POST"),
};

// Apartment functions
export const apartments = {
  getAll : () => apiCall(`/apartments`),
  get: (apartmentId, signal) =>
    apiCall(`/apartments/${apartmentId}`, "GET", null, signal),
  update: (apartmentId, apartmentData) =>
    apiCall(`/apartments/${apartmentId}`, "PUT", apartmentData),
  delete: (apartmentId) => apiCall(`/apartments/${apartmentId}`, "DELETE"),
  associateUser: (apartmentId, userId) =>
    apiCall(`/apartments/${apartmentId}/associate/${userId}`, "POST"),
  disassociateUser: (apartmentId, userId) =>
    apiCall(`/apartments/${apartmentId}/associate/${userId}`, "DELETE"),
};



//option2

// const BASE_URL = "http://localhost:3001";

// // Utility function for API calls
// async function apiCall(endpoint, method = "GET", data = null, signal = null) {
//   const url = `${BASE_URL}${endpoint}`;
//   const options = {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     signal,
//   };
//   if (data) {
//     options.body = JSON.stringify(data);
//   }
//   console.log("url", url);
//   console.log("options", options);
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     const error = new Error("An error occurred while making the request");
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }
//   return response.json();
// }

// // New utility function for multipart form data
// async function multipartApiCall(
//   endpoint,
//   method = "POST",
//   formData,
//   signal = null
// ) {
//   const url = `${BASE_URL}${endpoint}`;
//   const options = {
//     method,
//     body: formData,
//     signal,
//   };
//   console.log("url", url);
//   console.log("options", options);
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     const error = new Error("An error occurred while making the request");
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }
//   return response.json();
// }

// // Auth functions
// export const auth = {
//   // registerApartment: (formData) =>
//   //   multipartApiCall("/auth/register/apartment", "POST", formData),
//   registerApartment: (formData) =>
//     multipartApiCall("/auth/register/apartment", "POST", formData),
//   registerUser: (userData) => apiCall("/auth/register/user", "POST", userData),
//   login: (credentials) => apiCall("/auth/login", "POST", credentials),
//   logout: () => apiCall("/auth/logout"),
// };

// // User functions
// export const users = {
//   get: (userId, signal) => apiCall(`/users/${userId}`, "GET", null, signal),
//   update: (userId, userData) => apiCall(`/users/${userId}`, "PUT", userData),
//   delete: (userId) => apiCall(`/users/${userId}`, "DELETE"),
//   getSuggestions: (userId, signal) =>
//     apiCall(`/users/${userId}/suggestions`, "GET", null, signal),
//   associateToApartment: (userId, apartmentId) =>
//     apiCall(`/users/${userId}/${apartmentId}`, "POST"),
// };

// // Apartment functions
// export const apartments = {
//   get: (apartmentId, signal) =>
//     apiCall(`/apartments/${apartmentId}`, "GET", null, signal),
//   update: (apartmentId, apartmentData) =>
//     apiCall(`/apartments/${apartmentId}`, "PUT", apartmentData),
//   delete: (apartmentId) => apiCall(`/apartments/${apartmentId}`, "DELETE"),
//   associateUser: (apartmentId, userId) =>
//     apiCall(`/apartments/${apartmentId}/associate/${userId}`, "POST"),
//   disassociateUser: (apartmentId, userId) =>
//     apiCall(`/apartments/${apartmentId}/associate/${userId}`, "DELETE"),
// };
