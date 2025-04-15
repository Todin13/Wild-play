const API_BASE = "http://localhost:5019/api/users";

export const loginUser = async (email, password) => { // Function to login
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies in request
    });
  
    const data = await response.json();
    return data;
};

export const registerUser = async (userData) => { // Function to register
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

export const fetchUserProfile = async () => { // Function to get user's profile
  const response = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    credentials: "include", // Include cookies in request
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

export const fetchCountryCodes = async () => { // Function to fetch all country phone prefix code
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

export const updateUserProfile = async (updatedData) => { // Function to update user's info
  try {
    const response = await fetch(`${API_BASE}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include cookies in request
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }
};

export const updatePassword = async (password) => { // Function to update password
  try {
    const response = await fetch(`${API_BASE}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, message: "An error occurred while updating the password." };
  }
};

export const fetchUsers = async () => { // Function to fetch all users
  try {
    const res = await fetch(`${API_BASE}/search/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_type: "USER" })
    });
    console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const searchUsers = async (query) => { // Function to search user by specific field
  try {
    const res = await fetch(`${API_BASE}/search/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(query)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteUserById = async (userId) => { // Function to delete user
  try {
    const res = await fetch(`${API_BASE}/delete/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getUserDetail = async (username) => { // Fuction to get the user detail by his/her username
  try {
    const res = await fetch(`${API_BASE}/search/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return { success: true, data: data[0] };

  } catch (err) {
    console.error("Fetch error:", err);
    return { success: false, message: err.message };
  }
};

export const logoutUser = async () => { //Function to logout
  try {
    const response = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Logout failed");

    return { success: true, message: data.message || "Logged out successfully" };

  } catch (err) {
    console.error("Logout error:", err);
    return { success: false, message: err.message };
  }
};
