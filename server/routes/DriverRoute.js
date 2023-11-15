import express from "express";
import {
  getDriver,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/Driver.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/driver", verifyUser, getDriver);
router.get("/driver/:id", verifyUser, getDriverById);
router.post("/driver", verifyUser, createDriver);
router.patch("/driver/:id", verifyUser, updateDriver);
router.delete("/driver/:id", verifyUser, deleteDriver);

export default router;
