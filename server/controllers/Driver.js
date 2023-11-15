import Driver from "../models/DriverModel.js";
import { Op } from "sequelize";

export const getDriver = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Driver.findAll({
        attributes: ["id", "uuid", "name", "status"],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!driver) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Driver.findOne({
        attributes: ["id", "uuid", "name", "status"],
        where: {
          id: driver.id,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDriver = async (req, res) => {
  const { name, status } = req.body;
  try {
    await Driver.create({
      name: name,
      status: status,
    });
    res.status(201).json({ msg: "Driver Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!driver) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, status } = req.body;
    if (req.role === "admin") {
      await Driver.update(
        { name, status },
        {
          where: {
            id: driver.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "Driver updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!driver) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, status } = req.body;
    if (req.role === "admin") {
      await Driver.destroy({
        where: {
          id: driver.id,
        },
      });
    }
    res.status(200).json({ msg: "Driver deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
