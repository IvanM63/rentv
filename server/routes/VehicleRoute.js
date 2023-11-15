import express from "express";
import {
  getVehicle,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/Vehicle.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/vehicle", verifyUser, getVehicle);
router.get("/vehicle/:id", verifyUser, getVehicleById);
router.post("/vehicle", verifyUser, createVehicle);
router.patch("/vehicle/:id", verifyUser, updateVehicle);
router.delete("/vehicle/:id", verifyUser, deleteVehicle);

export default router;
