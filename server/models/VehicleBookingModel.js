import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Vehicle from "./VehicleModel.js";
import User from "./UserModel.js";
import Driver from "./DriverModel.js";

const { DataTypes } = Sequelize;

const VehicleBooking = db.define(
  "vehicle_booking",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    booking_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    supervisor1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    supervisor2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(VehicleBooking);
Vehicle.hasOne(VehicleBooking);
Driver.hasOne(VehicleBooking);
VehicleBooking.belongsTo(User, { foreignKey: "userId" });
VehicleBooking.belongsTo(Vehicle, { foreignKey: "vehicleId" });
VehicleBooking.belongsTo(Driver, { foreignKey: "driverId" });

export default VehicleBooking;
