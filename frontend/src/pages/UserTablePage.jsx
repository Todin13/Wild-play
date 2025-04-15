import { Link } from "react-router-dom";
import { useUserTable } from "../hooks/useUser";
import '../assets/styles/App.css';
import { Input, Button, Select, SelectItem, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

function UserTable() {
  const {
    users, searchField, searchValue, birthdate, isChecked,
    setSearchField, setSearchValue, handleSearch,
    handleBirthdateChecked, handleBirthdate, deleteUser
  } = useUserTable();

  return (
    <div>
      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Select className="w-full" label="Search Field" size="sm" variant="bordered" defaultSelectedKeys={[searchField]} value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <SelectItem key="firstName" value="firstName">First Name</SelectItem>
          <SelectItem key="lastName" value="lastName">Last Name</SelectItem>
          <SelectItem key="username" value="username">Username</SelectItem>
          <SelectItem key="email" value="email">Email</SelectItem>
          <SelectItem key="phone" value="phone">Phone</SelectItem>
          <SelectItem key="driver_license" value="driver_license">Driver License</SelectItem>
          <SelectItem key="street" value="street">Street</SelectItem>
          <SelectItem key="city" value="city">City</SelectItem>
          <SelectItem key="county" value="county">County</SelectItem>
          <SelectItem key="zip" value="zip">Zip Code</SelectItem>
          <SelectItem key="country" value="country">Country</SelectItem>
        </Select>
        <Input 
          size='lg' 
          variant="bordered"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button color="success" size="lg" variant="ghost" onPress={handleSearch}>Search</Button>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Checkbox
          color="success"
          size="lg"
          checked={isChecked}
          onChange={handleBirthdateChecked}
        >
        <Input 
          label="Date of Birth" 
          size='lg' 
          variant="underlined"
          type="date"
          disabled={!isChecked}
          value={birthdate}
          onChange={handleBirthdate}
        />
        </Checkbox>
      </div>

      <Table removeWrapper aria-label="Example static collection table" className="mt-4 mb-4 gap-4" color="danger" selectionMode="single"> 
        <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>Full Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/userDetail?username=${encodeURIComponent(user.username)}`}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell><Button color="danger" size="lg" variant="shadow" onPress={() => deleteUser(user._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
