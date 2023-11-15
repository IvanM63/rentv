import express from "express";
import {
  getVehicleBooking,
  getVehicleBookingById,
  createVehicleBooking,
  updateVehicleBooking,
  deleteVehicleBooking,
} from "../controllers/VehicleBooking.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/vehicle-booking", verifyUser, getVehicleBooking);
router.get("/vehicle-booking/:id", verifyUser, getVehicleBookingById);
router.post("/vehicle-booking", verifyUser, createVehicleBooking);
router.patch("/vehicle-booking/:id", verifyUser, updateVehicleBooking);
router.delete("/vehicle-booking/:id", verifyUser, deleteVehicleBooking);

export default router;
