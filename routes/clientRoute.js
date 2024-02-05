

const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createClient,
  getClients,
   getClient,
   deleteClient,
   updateClient,
} = require("../controllers/clientController");
const { upload } = require("../utils/fileUpload");

// router.post("/", protect, createProduct);
router.post("/", protect, upload.single("image"), createClient);
 router.patch("/:id", protect, upload.single("image"), updateClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClient);
 router.delete("/:id", protect, deleteClient);

module.exports = router;
