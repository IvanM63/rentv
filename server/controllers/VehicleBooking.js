import User from "../models/UserModel.js";
import Driver from "../models/DriverModel.js";
import VehicleBooking from "../models/VehicleBookingModel.js";
import Vehicle from "../models/VehicleModel.js";
import { Op } from "sequelize";

export const getVehicleBooking = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "supervisor") {
      response = await VehicleBooking.findAll({
        attributes: [
          "uuid",
          "pickup_location",
          "description",
          "destination",
          "booking_time",
          "supervisor1",
          "supervisor2",
          "status",
        ],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Driver,
            attributes: ["name", "status"],
          },
          {
            model: Vehicle,
            attributes: [
              "name",
              "brand",
              "type",
              "status",
              "fuel_consumption",
              "last_service_date",
            ],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVehicleBookingById = async (req, res) => {
  try {
    const vehicle_booking = await VehicleBooking.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle_booking)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin" || req.role === "supervisor") {
      response = await VehicleBooking.findOne({
        attributes: [
          "uuid",
          "pickup_location",
          "description",
          "destination",
          "booking_time",
          "supervisor1",
          "supervisor2",
          "status",
        ],
        where: {
          id: vehicle_booking.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Driver,
            attributes: ["name", "status"],
          },
          {
            model: Vehicle,
            attributes: [
              "name",
              "brand",
              "type",
              "status",
              "fuel_consumption",
              "last_service_date",
            ],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createVehicleBooking = async (req, res) => {
  const {
    pickup_location,
    description,
    destination,
    booking_time,
    supervisor1,
    supervisor2,
    status,
    driverId,
    vehicleId,
  } = req.body;
  try {
    await VehicleBooking.create({
      pickup_location: pickup_location,
      description: description,
      destination: destination,
      booking_time: booking_time,
      supervisor1: supervisor1,
      supervisor2: supervisor2,
      status: status,
      userId: req.userId,
      driverId: driverId,
      vehicleId: vehicleId,
    });
    res.status(201).json({ msg: "Vehicle Booking Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateVehicleBooking = async (req, res) => {
  try {
    const vehicle_booking = await VehicleBooking.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle_booking)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      pickup_location,
      description,
      destination,
      booking_time,
      supervisor1,
      supervisor2,
      status,
    } = req.body;
    if (req.role === "admin" || req.role === "supervisor") {
      await VehicleBooking.update(
        {
          pickup_location,
          description,
          destination,
          booking_time,
          supervisor1,
          supervisor2,
          status,
        },
        {
          where: {
            id: vehicle_booking.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "Vehicle Booking updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteVehicleBooking = async (req, res) => {
  try {
    const vehicle_booking = await VehicleBooking.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle_booking)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      pickup_location,
      description,
      destination,
      booking_time,
      supervisor1,
      supervisor2,
      status,
    } = req.body;
    if (req.role === "admin" || req.role === "supervisor") {
      await VehicleBooking.destroy({
        where: {
          id: vehicle_booking.id,
        },
      });
    }
    res.status(200).json({ msg: "Vehicle Booking deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
