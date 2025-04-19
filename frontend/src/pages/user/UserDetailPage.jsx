import { useUserDetail } from "@/hooks/UserHooks";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

function UserDetail() {
  const { user, loading } = useUserDetail();

  return (
    <MainLayout>
    <div className="flex flex-col flex-wrap justify-center items-center md:flex-nowrap gap-4 mb-5 mt-5 max-w-4xl mx-auto custom-font-input">
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
    </MainLayout>
  );
}

export default UserDetail;
