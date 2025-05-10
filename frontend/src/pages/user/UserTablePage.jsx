import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useUserTable } from "@/hooks/UserHooks";
import { Input, Button, Select, SelectItem, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@heroui/react";
import "@/assets/styles/index.css";
import MainLayout from "@/layouts/MainLayout";

function UserTable() {
  const {
    users, searchField, searchValue, birthdate, isChecked,
    setSearchField, setSearchValue, handleSearch,
    handleBirthdateChecked, handleBirthdate, deleteUser
  } = useUserTable();

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <MainLayout>
    <div className="flex flex-col w-full flex-wrap justify-center items-center md:flex-nowrap gap-4 mb-5 mt-8 custom-font-input">
      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4 max-w-4xl mx-auto">
        <Checkbox
          color="success"
          size="lg"
          checked={isChecked}
          onChange={handleBirthdateChecked}
        >
        </Checkbox>
        <Input 
          label="Date of Birth" 
          size='sm' 
          variant="underlined"
          type="date"
          className="max-w-xs"
          disabled={!isChecked}
          value={birthdate}
          onChange={handleBirthdate}
        />
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

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4 max-w-4xl mx-auto">
        <Table 
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="success"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          removeWrapper 
          className="mt-4 mb-4 gap-4" 
          color="danger" 
          selectionMode="single">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Username</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Delete</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/userDetail?username=${encodeURIComponent(user.username)}`}>
                      {user.username}
                    </Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell><Button color="danger" size="lg" variant="shadow" onPress={() => deleteUser(user._id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>
    </div>
    </MainLayout>
  );
}

export default UserTable;
