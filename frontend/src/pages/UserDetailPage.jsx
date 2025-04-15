import "../assets/styles/App.css";
import { useUserDetail } from "../hooks/useUser";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";

function UserDetail() {
  const { user, loading } = useUserDetail();

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Field</TableColumn>
            <TableColumn>Information</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                Name:
              </TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
            </TableRow>

            <TableRow key="2">
              <TableCell>
                Username:
              </TableCell>
              <TableCell>
                {user.username}
              </TableCell>
            </TableRow>

            <TableRow key="3">
              <TableCell>
                Email:
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Phone:
              </TableCell>
              <TableCell>
                {user.phone}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Birthdate:
              </TableCell>
              <TableCell>
                {user.birthdate.split('T')[0]}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Street:
              </TableCell>
              <TableCell>
                {user.billing_address.street}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                City:
              </TableCell>
              <TableCell>
                {user.billing_address.city}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                County:
              </TableCell>
              <TableCell>
                {user.billing_address.county}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Zip:
              </TableCell>
              <TableCell>
                {user.billing_address.zip}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Country:
              </TableCell>
              <TableCell>
                {user.billing_address.country}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Driver License:
              </TableCell>
              <TableCell>
                {user.driver_license}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default UserDetail;
