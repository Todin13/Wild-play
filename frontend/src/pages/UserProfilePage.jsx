import "../assets/styles/App.css";
import { useProfile } from "../hooks/useUser";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";

export default function Profile() {
  const { user, error } = useProfile();

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && user.detail ? (
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
                {user.detail.firstName} {user.detail.lastName}
              </TableCell>
            </TableRow>

            <TableRow key="2">
              <TableCell>
                Username:
              </TableCell>
              <TableCell>
                {user.detail.username}
              </TableCell>
            </TableRow>

            <TableRow key="3">
              <TableCell>
                Email:
              </TableCell>
              <TableCell>
                {user.detail.email}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Phone:
              </TableCell>
              <TableCell>
                {user.detail.phone}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Birthdate:
              </TableCell>
              <TableCell>
                {user.detail.birthdate.split('T')[0]}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Street:
              </TableCell>
              <TableCell>
                {user.detail.billing_address.street}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                City:
              </TableCell>
              <TableCell>
                {user.detail.billing_address.city}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                County:
              </TableCell>
              <TableCell>
                {user.detail.billing_address.county}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Zip:
              </TableCell>
              <TableCell>
                {user.detail.billing_address.zip}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Country:
              </TableCell>
              <TableCell>
                {user.detail.billing_address.country}
              </TableCell>
            </TableRow>

            <TableRow key="4">
              <TableCell>
                Driver License:
              </TableCell>
              <TableCell>
                {user.detail.driver_license}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
  );
}
