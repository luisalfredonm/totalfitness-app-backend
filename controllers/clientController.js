const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create Prouct
const createClient = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const client = await Client.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(client);
});

// Get all Products
const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(clients);
});

// Get single product
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // if product doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }
  // Match product to its user
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(client);
});

// Delete Product
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // if product doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }
  // Match product to its user
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await client.deleteOne();
  res.status(200).json({ message: "Client deleted." });
});

// Update Product
const updateClient = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const client = await Client.findById(id);

  // if product doesnt exist
  if (!client) {
    res.status(404);
    throw new Error("Cleint not found");
  }
  // Match product to its user
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedClient = await Client.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? client?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};