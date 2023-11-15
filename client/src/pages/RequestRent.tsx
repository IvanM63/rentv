import React, { Children, useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import InputFieldCustom from "../components/input-field-custom";
import axios from "axios";
import ItemsList from "../components/VehicleList";
import VehicleList from "../components/VehicleList";
import DriverList from "../components/DriverList";

const RequestRent = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: any) => state.auth);

  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [drivers, setDrivers] = React.useState<Driver[]>([]);

  //Text Controller
  const [vehicleBooking, setVehicleBooking] = React.useState<VehicleBooking>({
    description: "",
    pickup_location: "",
    destination: "",
    booking_time: "",
    supervisor1: "",
    supervisor2: "",
    status: "Menunggu Persetujuan",
    driverId: 1,
    vehicleId: 1,
  });

  const getAllVehicles = async () => {
    const response = await axios.get("http://localhost:5000/vehicle");
    setVehicles(response.data);
  };

  const getAllDrivers = async () => {
    const response = await axios.get("http://localhost:5000/driver");
    setDrivers(response.data);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/vehicle-booking", {
          description: vehicleBooking.description.toString(),
          pickup_location: vehicleBooking.pickup_location.toString(),
          destination: vehicleBooking.destination.toString(),
          booking_time: vehicleBooking.booking_time.toString(),
          supervisor1: "123",
          supervisor2: "123",
          status: "Menunggu Persetujuan",
          driverId: vehicleBooking.driverId,
          vehicleId: vehicleBooking.vehicleId,
        })
        .then((response) => {
          console.log(response);
        });
      alert("Success Request Rent");
    } catch (error) {
      if (error) {
        console.log(error);
        alert("Error Request Rent. Please try again");
      }
    }
  };

  useEffect(() => {
    //console.log("useEffect");
    getAllVehicles();
    getAllDrivers();
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      alert("You are not authorized to access this page");
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const onChangeVehicle = (value: Vehicle) => {
    setVehicleBooking({
      ...vehicleBooking,
      vehicleId: value.id,
    });
  };

  const onChangeDriver = (value: Driver) => {
    setVehicleBooking({
      ...vehicleBooking,
      driverId: value.id,
    });
  };

  const renderDriverList = drivers.length > 0 && (
    <DriverList onChanges={onChangeDriver} items={drivers} title="Driver" />
  );

  const renderVehicleList = vehicles.length > 0 && (
    <VehicleList
      onChanges={onChangeVehicle}
      items={vehicles}
      title="Vehicle Type"
    />
  );

  return (
    <Layout>
      <div className="flex flex-col rounded-lg shadow-lg -mt-4 m-4 h-full">
        {/* Header Section */}
        <div className="flex flex-col rounded-t-lg bg-blue-400">
          <div className="flex flex-row justify-between p-4">
            <h1 className="text-white text-2xl font-bold">Request Rent</h1>
          </div>
        </div>
        <div className="flex flex-col mx-4">
          <form onSubmit={handleSubmit}>
            {/* UPPER SECTION */}
            <div className="flex flex-row">
              <div className="flex flex-1 flex-col w-full space-y-2 my-4">
                {renderVehicleList}

                <InputFieldCustom
                  title="Description"
                  placeholder="Desc"
                  value={vehicleBooking.description}
                  onChange={(value) => {
                    setVehicleBooking({
                      ...vehicleBooking,
                      description: value,
                    });
                  }}
                  type="textarea"
                />
                <InputFieldCustom
                  title="Pickup Location"
                  placeholder="Pickup Location"
                  value={vehicleBooking.pickup_location}
                  onChange={(value) => {
                    setVehicleBooking({
                      ...vehicleBooking,
                      pickup_location: value,
                    });
                  }}
                />
                <InputFieldCustom
                  title="Destination"
                  placeholder="Destination"
                  value={vehicleBooking.destination}
                  onChange={(value) => {
                    setVehicleBooking({
                      ...vehicleBooking,
                      destination: value,
                    });
                  }}
                />
                <InputFieldCustom
                  title="Booking Time"
                  placeholder="Booking Time"
                  value={vehicleBooking.booking_time}
                  onChange={(value) => {
                    setVehicleBooking({
                      ...vehicleBooking,
                      booking_time: value,
                    });
                  }}
                />
                {renderDriverList}
                <button className="bg-green-500 text-md p-2 text-white rounded-md hover:bg-green-600 active:scale-95 transition-all duration-200">
                  Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RequestRent;

interface VehicleBooking {
  description: string;
  pickup_location: string;
  destination: string;
  booking_time: string;
  supervisor1: string;
  supervisor2: string;
  status: string;
  driverId: number;
  vehicleId: number;
}

interface Vehicle {
  id: number;
  uuid: string;
  name: string;
  brand: string;
  type: string;
  status: string;
  fuel_consumption: string;
  last_service_date: string;
}

interface Driver {
  id: number;
  uuid: string;
  name: string;
  status: string;
}
