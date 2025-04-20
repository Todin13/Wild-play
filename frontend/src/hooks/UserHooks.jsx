import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser, fetchUserProfile, fetchCountryCodes, updateUserProfile, updatePassword, fetchUsers, searchUsers, deleteUserById, getUserDetail, logoutUser, checkLoginStatus } from '../modules/users/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true); // Start loading
    setError(null);

    try {
      const data = await loginUser(email, password); // Call API
      console.log("test",data.user);

      if (data.message === "Login successful!") {
        setSuccess(data.message);
        setUser(data.user);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, success, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState("");
    const navigate = useNavigate();

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
        console.log(result);
        console.log(result.error);
        console.log(result.message);

        if(result.message === "User saved successfully! Please log in for further possibility"){
          setSuccess(result.message || "Success");
          navigate("/login");
        }else{
          setError(result.message);
        }

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { handleRegister, loading, error,countryCodes, selectedCode, setSelectedCode, success, setError}; // Set default to 353 or first code if not found
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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
  
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

      setError("");
      setSuccess("");
  
      try {
        const data = await updateUserProfile(updatedData); // Call API
        if(data.message === 'User updated successfully'){
          setSuccess(data.message);
        }else{
          setError(data.message)
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile.");
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
      error,
      success,
    };
};

export function usePasswordUpdate() {
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
  
    const handleSubmit = async () => {

      setError("");
      setSuccess("");

      // Simple PW validation
      if(!password || !confirmPw){
        setError("Please fill in the field");
        return;
      }

      if (password !== confirmPw) {
        setError("Password doesn't match");
        return;
      }

      try{
        const response = await updatePassword(password); // Call API
        console.log(response);
        console.log(response.error);

        if (response.message === 'User updated successfully') {
          setSuccess("Password updated successfully!");
        } else {
          setError(response.error);
        }
      } catch (error) {
        console.error("Error updating password:", error);
        setError("Failed to update password.");
      }
    };
  
    return { password, confirmPw, setPassword, setConfirmPw, handleSubmit, error, success, };
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
      const query = {
        user_type: "USER" // Hardcoded user_type
      };
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
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await checkLoginStatus();
          
          if (res && res.data && res.data.user) {
            console.log("User is logged in:", res.data.user);
            setIsLoggedIn(true);
            setUserType(res.data.user.user_type);

            const { ok, data } = await fetchUserProfile();

            if (ok) {
              setUser(data);
              console.log("User logged in:",data);
            }
          } else {
            console.log("No valid cookie or user not logged in.");
            setUserType(null);
          }
        } catch (err) {
          console.error("Login check failed:", err);
          setUserType(null); // Not logged in
        }finally{
          setTimeout(() => {
            setLoading(false);
          }, 100);
        }
      };
  
      fetchUser();
    }, []);
  
    return { isLoggedIn, userType, user, loading };
};

export function useUserLogout() {
  const handleLogout = async () => {
    const result = await logoutUser(); // Call API
    if (result.success) {
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  };

  return handleLogout;
};