import { useProfile } from "@/hooks/UserHooks";
import { Link } from 'react-router-dom';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

export default function Profile() {
  const { user, error } = useProfile();

  return (
    <MainLayout>
    <div className="flex flex-col flex-wrap justify-center items-center md:flex-nowrap gap-4 mb-5 mt-5 max-w-4xl mx-auto custom-font-input">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && user.detail ? (
        <>
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

          <div className="flex w-full flex-wrap justify-center md:flex-nowrap gap-4 mt-5 mb-5">
            <Button color="primary" size="sm" variant="light"><Link to="/update">Update Profile</Link></Button>
            <Button color="primary" size="sm" variant="light"><Link to="/pwupd">Update Password</Link></Button>
          </div>
        </>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
    </MainLayout>
  );
}
