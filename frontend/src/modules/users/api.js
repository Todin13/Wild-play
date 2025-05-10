/*

Function to request on backend api for users
Author: Xiang Yu Oon

*/
//const API_BASE = "http://localhost:5019/api/users";
import API from "@/utils/api";

export const loginUser = async (email, password) => {
  // Function to login
  const response = await API.post("/users/login", { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  // Function to register
  const response = await API.post("/users/register", userData);
  return response.data;
};

export const fetchUserProfile = async () => {
  // Function to get user's profile
  const response = await API.get("/users/profile");
  return { ok: true, data: response.data };
};

export const fetchCountryCodes = async () => {
  // Function to fetch all country phone prefix code
  try {
    const response = await fetch("https://restcountries.com/v3.1/all"); // Fetch from REST API
    const data = await response.json();

    const codes = data
      .map((country) => {
        const root = country.idd?.root; // Get root calling code
        const suffix = country.idd?.suffixes?.[0] || ""; // Get first suffix if available
        return root ? { code: root + suffix, name: country.name.common } : null; // Combine them to return country name and code
      })
      .filter(Boolean) // Remove null values
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort by country name

    return codes;
  } catch (error) {
    console.error("Error fetching country codes:", error);
    throw new Error("Error fetching country codes");
  }
};

export const updateUserProfile = async (updatedData) => {
  // Function to update user's info
  try {
    const response = await API.put("/users/update/", updatedData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    throw new Error("Failed to update profile.");
  }
};

export const updatePassword = async (password) => {
  // Function to update password
  try {
    const response = await API.put("/users/update", { password });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating password:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: "An error occurred while updating the password.",
    };
  }
};

export const fetchUsers = async () => {
  // Function to fetch all users
  try {
    const res = await API.post("/users/search/admin", { user_type: "USER" });
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

export const searchUsers = async (query) => {
  // Function to search user by specific field
  try {
    const res = await API.post("/users/search/admin", query);
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

export const deleteUserById = async (userId) => {
  // Function to delete user
  try {
    const response = await API.delete(`/users/delete/${userId}`);
    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

export const getUserDetail = async (username) => {
  // Fuction to get the user detail by his/her username
  try {
    const res = await API.post("/users/search/admin", { username });
    return { success: true, data: res.data[0] };
  } catch (err) {
    console.error("Axios error:", err);
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

export const logoutUser = async () => {
  //Function to logout
  try {
    const response = await API.post("/users/logout");
    return {
      success: true,
      message: response.data.message || "Logged out successfully",
    };
  } catch (err) {
    console.error("Logout error:", err);
    return {
      success: false,
      message: err.response?.data?.error || err.message || "Logout failed",
    };
  }
};

export const checkLoginStatus = async () => {
  try {
    const res = await API.get("/users/cookie"); // Full URL: https://yourbackend.com/cookie
    return res;
  } catch (err) {
    console.error("Failed:", err.response?.data || err.message);
  }
};
