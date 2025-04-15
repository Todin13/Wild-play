import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { loginUser, registerUser, fetchUserProfile, fetchCountryCodes, updateUserProfile, updatePassword, fetchUsers, searchUsers, deleteUserById, getUserDetail, logoutUser } from '../features/userController';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true); // Start loading
    setError(null);

    try {
      const data = await loginUser(email, password); // Call API

      if (data.message === "Login successful!") {
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message);
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState("");

    useEffect(() => {
        const loadCountryCodes = async () => {
          try {
            const codes = await fetchCountryCodes(); // Call API
            setCountryCodes(codes);
            if (codes.length > 0) {
              setSelectedCode(codes.find(c => c.code === "+353")?.code || codes[0].code);
            }
          } catch (err) {
            setError("Failed to load country codes:", err.message);
          }
        };
    
        loadCountryCodes();
    }, []);
  
    const handleRegister = async (userData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await registerUser(userData); // Call API
        if (result.error) {
          setError(result.error);
          alert(result.error);
        } else {
          alert(result.message || "Success");
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { handleRegister, loading, error,countryCodes, selectedCode, setSelectedCode}; // Set default to 353 or first code if not found
};

export const useProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const getProfile = async () => {
        const { ok, data } = await fetchUserProfile(); // Call API
  
        if (ok) {
          setUser(data);
        } else {
          setError(data.error || "Failed to fetch profile");
        }
      };
  
      getProfile();
    }, []);
  
    return { user, error };
};

export const useUserUpdate = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCodes, setCountryCodes] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCode, setSelectedCode] = useState("");
    const [phone, setPhone] = useState([]);
    const [birthdate, setBirthdate] = useState("");
    const [billingAddress, setBillingAddress] = useState({
      street: "",
      city: "",
      county: "",
      zip: "",
      country: "",
    });
    const [driverLicense, setDriverLicense] = useState("");
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      const loadProfile = async () => { // Get user profile
        try {
          const { ok, data }  = await fetchUserProfile(); // Call API
          if(ok){ // Set all the variable to what the code get from API
            setFirstName(data.detail.firstName || "");
            setLastName(data.detail.lastName || "");
            setEmail(data.detail.email || "");
            if (Array.isArray(data.detail.phone) && data.detail.phone.length === 2) {
                const formattedPrefix = `+${data.detail.phone[0]}`;
                setPhoneNumber(data.detail.phone[1]);
                setSelectedCode(formattedPrefix);
            }
            setBirthdate(data.detail.birthdate.split('T')[0] || "");
            setBillingAddress(data.detail.billing_address || {});
            setDriverLicense(data.detail.driver_license || "");
            setUsername(data.detail.username || "");
         }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };
  
      loadProfile()
    }, []);
  
    useEffect(() => {
      const loadCountryCodesData = async () => {
        try {
          const codes = await fetchCountryCodes(selectedCode); // Call API
          setCountryCodes(codes);
        } catch (error) {
          console.error("Error fetching country codes:", error);
        }
      };
  
      if (selectedCode) {
        loadCountryCodesData();
      }
    }, [selectedCode]);
  
    useEffect(() => {
      setPhone([selectedCode, phoneNumber]);
    }, [selectedCode, phoneNumber]);
  
    const handleSubmit = async () => {
      const updatedData = {
        firstName,
        lastName,
        email,
        phone,
        birthdate,
        billing_address: billingAddress,
        driver_license: driverLicense,
        username,
      };
  
      try {
        await updateUserProfile(updatedData); // Call API
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    };
  
    return {
      firstName,
      lastName,
      email,
      phoneNumber,
      selectedCode,
      countryCodes,
      birthdate,
      billingAddress,
      driverLicense,
      username,
      setFirstName,
      setLastName,
      setEmail,
      setPhoneNumber,
      setSelectedCode,
      setBirthdate,
      setBillingAddress,
      setDriverLicense,
      setUsername,
      handleSubmit,
    };
};

export function usePasswordUpdate() {
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
  
    const handleSubmit = async () => {
      if (password !== confirmPw) { // Simple PW validation
        alert("Password doesn't match");
        return;
      }
  
      const response = await updatePassword(password); // Call API
      
      if (response.success) {
        alert("Profile updated successfully!");
      } else {
        alert(response.message);
      }
    };
  
    return { password, confirmPw, setPassword, setConfirmPw, handleSubmit };
};

export function useUserTable() {
    const [users, setUsers] = useState([]);
    const [searchField, setSearchField] = useState('firstName');
    const [searchValue, setSearchValue] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isChecked, setIsChecked] = useState(false);
  
    useEffect(() => {
      fetchAllUsers(); // Get all user by API
    }, []);
  
    const fetchAllUsers = async () => {
      const result = await fetchUsers(); // Call API
      if (result.success) {
        setUsers(result.data);
      }
    };
  
    const handleSearch = async () => { // Handle search query
      const query = {};
      if (searchValue) query[searchField] = searchValue;
      if (birthdate) query.birthdate = birthdate;
  
      const result = await searchUsers(query);
      if (result.success) {
        setUsers(result.data);
      }
    };
  
    const handleBirthdateChecked = (e) => { // Handle birthdate field, if checked it will included as query, vise versa
      setIsChecked(e.target.checked);
      if (!e.target.checked) setBirthdate('');
    };
  
    const handleBirthdate = (e) => {
      setBirthdate(e.target.value);
    };
  
    const deleteUser = async (userId) => { // Delete user
      const result = await deleteUserById(userId); // Call API
      if (result.success) {
        fetchAllUsers();
      } else {
        console.error("Delete failed:", result.message);
      }
    };
  
    return {
      users,
      searchField,
      searchValue,
      birthdate,
      isChecked,
      setSearchField,
      setSearchValue,
      handleSearch,
      handleBirthdateChecked,
      handleBirthdate,
      deleteUser
    };
};

function useQuery() {
    return new URLSearchParams(useLocation().search); // Parse search string from URL
};

export function useUserDetail() {
    const query = useQuery(); // Get query parameters from URL
    const username = query.get("username"); // Extract username from query
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
  
    const fetchUser = async () => {
      setLoading(true);
      const result = await getUserDetail(username); // Call API
      if (result.success) {
        setUser(result.data);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    return { user, loading };
};

export function useUserDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = Cookies.get("__wild_app_token"); // Get token from cookies
      setIsLoggedIn(!!token); // Set login state based on token presence
    }, []);
  
    const handleLogout = async () => {
      const result = await logoutUser(); // Call API
      if (result.success) {
        alert(result.message);
        window.location.href = "/dashboard";
      } else {
        alert(result.message);
      }
    };
  
    return { isLoggedIn, handleLogout };
};