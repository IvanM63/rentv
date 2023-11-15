import React, { Children, useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import MyButton from "../components/MyButton";
import * as XLSX from "xlsx";

const BookingList = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: any) => state.auth);
  const [vehiclesBookings, setVehiclesBookings] = React.useState<any[]>([]);
  const [activeVehicleBooking, setActiveVehicleBooking] =
    React.useState<any>(null);

  const userUuid = user ? user.uuid : null;

  useEffect(() => {
    if (user) {
      //console.log(userUuid);
    }
  }, [userUuid]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      alert("You are not authorized to access this page");
      navigate("/");
    }
  }, [isError, user, navigate]);

  const getAllVehicleBooking = async () => {
    setActiveVehicleBooking(null);
    const response = await axios.get("http://localhost:5000/vehicle-booking");

    //Filter when supervisor1 and supervisor2 is not same as user.uuid
    const filteredResponse = await response.data.filter(
      (vb: any) => vb.status === "Disetujui"
    );
    setVehiclesBookings(filteredResponse);
  };

  useEffect(() => {
    getAllVehicleBooking();
  }, []);

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(vehiclesBookings);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "vehicle-booking.xlsx");
    alert("Export to excel");
    console.log("Berhasil export ke excel");
  };

  return (
    <Layout>
      <div className="flex flex-col rounded-lg shadow-lg -mt-4 m-4 h-full">
        {/* Header Section */}
        <div className="flex flex-col rounded-t-lg bg-blue-400">
          <div className="flex flex-row justify-between p-4">
            <h1 className="text-white text-2xl font-bold">Booking List</h1>
            <MyButton
              onClick={handleExportToExcel}
              title={"Export to Excel"}
              color={"bg-green-500"}
            />
          </div>
        </div>
        {/* Map List of available vehicle booking */}
        {activeVehicleBooking ? (
          <div>
            <div className="flex flex-col mx-4 my-4">
              <div className="flex">
                <h1 className="text-black text-xl font-bold">
                  Confirmed Booking
                </h1>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col my-2">
                      <h1 className="text-black text-xl">
                        {`Booking id: ${activeVehicleBooking.uuid}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Description: ${activeVehicleBooking.description}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Pickup Location: ${activeVehicleBooking.pickup_location}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Destination: ${activeVehicleBooking.destination}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Duration: ${activeVehicleBooking.booking_time}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Supervisor 1 ID: ${activeVehicleBooking.supervisor1}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Supervisor 2 ID: ${activeVehicleBooking.supervisor2}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {`Status: ${activeVehicleBooking.status}`}
                      </h1>
                      <h1 className="text-black text-xl">
                        {activeVehicleBooking.driverId}
                      </h1>
                      <h1 className="text-black text-xl">
                        {activeVehicleBooking.vehicleId}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setActiveVehicleBooking(null)}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mx-4 my-4">
            <div className="flex">
              <h1 className="text-black text-xl font-bold">
                Confirmed Booking
              </h1>
            </div>
            <div className="flex flex-col">
              {vehiclesBookings.map((vb) => {
                return (
                  // Manga Search Result Card
                  <div
                    className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 my-2"
                    onClick={() => setActiveVehicleBooking(vb)}
                  >
                    {`ID: ${vb.uuid} Desc: ${vb.description} `}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingList;
