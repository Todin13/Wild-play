import { Link } from "react-router-dom";
import { useUserTable } from "../hooks/useUser";
import '../assets/styles/App.css';

function UserTable() {
  const {
    users, searchField, searchValue, birthdate, isChecked,
    setSearchField, setSearchValue, handleSearch,
    handleBirthdateChecked, handleBirthdate, deleteUser
  } = useUserTable();

  return (
    <div>
      <div>
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="driver_license">Driver License</option>
          <option value="street">Street</option>
          <option value="city">City</option>
          <option value="county">County</option>
          <option value="zip">Zip Code</option>
          <option value="country">Country</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleBirthdateChecked}
        />
        <input
          type="date"
          disabled={!isChecked}
          value={birthdate}
          onChange={handleBirthdate}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>
                <Link to={`/userDetail?username=${encodeURIComponent(user.username)}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
