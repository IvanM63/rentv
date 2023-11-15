import Vehicle from "../models/VehicleModel.js";

export const getVehicle = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Vehicle.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "brand",
          "type",
          "status",
          "fuel_consumption",
          "last_service_date",
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Vehicle.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "brand",
          "type",
          "status",
          "fuel_consumption",
          "last_service_date",
        ],
        where: {
          id: vehicle.id,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createVehicle = async (req, res) => {
  const { name, brand, type, status, fuel_consumption, last_service_date } =
    req.body;
  try {
    await Vehicle.create({
      name: name,
      brand: brand,
      type: type,
      status: status,
      fuel_consumption: fuel_consumption,
      last_service_date: last_service_date,
    });
    res.status(201).json({ msg: "Vehicle Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, brand, type, status, fuel_consumption, last_service_date } =
      req.body;
    if (req.role === "admin") {
      await Vehicle.update(
        { name, brand, type, status, fuel_consumption, last_service_date },
        {
          where: {
            id: vehicle.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "Vehicle updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!vehicle) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, brand, type, status, fuel_consumption, last_service_date } =
      req.body;
    if (req.role === "admin") {
      await Vehicle.destroy({
        where: {
          id: vehicle.id,
        },
      });
    }
    res.status(200).json({ msg: "Vehicle deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
