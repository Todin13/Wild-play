/*

User profile page
Author: Xiang Yu Oon

*/
import TripCard from "@/components/ui/TripCard";
import GuideCard from "@/components/ui/GuideCard";
import { useUserTrips } from "@/hooks/TripHooks";
import { useProfile, useUserLogout } from "@/hooks/UserHooks";
import { useGuideByUserId } from "@/hooks/GuideHooks";
import { Link } from "react-router-dom";
import { useState } from "react";
import Update from "@/modules/users/UserUpdatePage";
import PwUpdate from "@/modules/users/PasswordUpdatePage";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "@/components/ui/Buttons";

export default function Profile() {
  const { user, error } = useProfile();

  useEffect(() => {
    if (user && user.detail) {
      fetchTrips();
    }
  }, [user]);

  const handleLogout = useUserLogout();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const [size, setSize] = useState(null);

  const { trips, fetchTrips, tripsLoading, tripsError } = useUserTrips();
  const { guideData, guideLoading } = useGuideByUserId();
  const navigate = useNavigate(); // Use navigate hook

  const goToCreateGuidePage = () => {
    navigate("/create-guide"); // Change '/about' to your target route
  };

  return (
    <MainLayout>
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <Btn variant="primary" onClick={() => navigate("/bookings")}>
          Bookings
        </Btn>
      </div>

      <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 mt-8 max-w-4xl mx-auto "></div>

      <div className="flex flex-col flex-wrap justify-center items-center md:flex-nowrap gap-4 mb-5 max-w-4xl mx-auto custom-font-input bg-intro-card p-8 space-y-6 rounded-lg shadow-card mt-8">
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
                  <TableCell>Name:</TableCell>
                  <TableCell>
                    {user.detail.firstName} {user.detail.lastName}
                  </TableCell>
                </TableRow>

                <TableRow key="2">
                  <TableCell>Username:</TableCell>
                  <TableCell>{user.detail.username}</TableCell>
                </TableRow>

                <TableRow key="3">
                  <TableCell>Email:</TableCell>
                  <TableCell>{user.detail.email}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Phone:</TableCell>
                  <TableCell>{user.detail.phone}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Birthdate:</TableCell>
                  <TableCell>{user.detail.birthdate.split("T")[0]}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Street:</TableCell>
                  <TableCell>{user.detail.billing_address.street}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>City:</TableCell>
                  <TableCell>{user.detail.billing_address.city}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>County:</TableCell>
                  <TableCell>{user.detail.billing_address.county}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Zip:</TableCell>
                  <TableCell>{user.detail.billing_address.zip}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Country:</TableCell>
                  <TableCell>{user.detail.billing_address.country}</TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell>Driver License:</TableCell>
                  <TableCell>{user.detail.driver_license}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Modal
              size={size}
              placement="top"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col justify-center items-center">
                      {" "}
                      {modalType === "updateProfile"
                        ? "Update Profile"
                        : "Update Password"}
                    </ModalHeader>
                    <ModalBody>
                      {modalType === "updateProfile" ? (
                        <>
                          <Update />
                        </>
                      ) : modalType === "updatePw" ? (
                        <PwUpdate />
                      ) : null}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <div className="flex w-full flex-wrap justify-center md:flex-nowrap gap-4 mt-5 mb-5">
              <Button
                color="primary"
                size="sm"
                variant="light"
                onPress={() => {
                  onOpen();
                  setModalType("updateProfile");
                  setSize("4xl");
                }}
              >
                Update Profile
              </Button>
              <Button
                color="primary"
                size="sm"
                variant="light"
                onPress={() => {
                  onOpen();
                  setModalType("updatePw");
                  setSize("sm");
                }}
              >
                Update Password
              </Button>

              {user.detail.user_type === "ADMIN" && (
                <Button color="primary" size="sm" variant="light">
                  <Link to="/admin">Admin Dashboard</Link>
                </Button>
              )}

              <Button
                color="danger"
                size="sm"
                variant="light"
                onPress={handleLogout}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          !error && <p>Loading profile...</p>
        )}
      </div>

      {/* User Trips */}
      {user && user.detail && (
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Trips</h2>
            <Button
              onPress={() => navigate("/plan-trip")}
              className="bg-buttonBg text-buttonText"
              size="lg"
              radius="full"
            >
              Create New Trip
            </Button>
          </div>
          <hr className="border-t-2 border-voga-border mb-6" />
          {tripsLoading ? (
            <p>Loading trips...</p>
          ) : tripsError ? (
            <p className="text-red-500">{tripsError.message}</p>
          ) : trips.length === 0 ? (
            <p>No trips found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Link to="/trips" state={{ trip: trip }} key={trip._id}>
                  <TripCard key={trip._id} trip={trip} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* User Guides */}
      {user && user.detail && (
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Guides</h2>
            <Button
              onPress={goToCreateGuidePage}
              className="bg-buttonBg text-buttonText"
              size="lg"
              radius="full"
            >
              Create New Guide
            </Button>
          </div>
          <hr className="border-t-2 border-voga-border mb-6" />
          {guideLoading ? (
            <p>Loading guides...</p>
          ) : !guideData || guideData.length === 0 ? (
            <p>No guide found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideData.map((guide) => (
                <Link to="/guides" state={{ guide: guide }} key={guide._id}>
                  <GuideCard key={guide._id} guide={guide} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}
