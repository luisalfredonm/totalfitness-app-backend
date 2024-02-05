

const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createClient,
//   getProducts,
//    getProduct,
//    deleteProduct,
//    updateProduct,
} = require("../controllers/clientController");
// const { upload } = require("../utils/fileUpload");

router.post("/", protect, createClient);
// router.post("/", protect, upload.single("image"), createProduct);
//  router.patch("/:id", protect, upload.single("image"), updateProduct);
// router.get("/", protect, getProducts);
// router.get("/:id", protect, getProduct);
//  router.delete("/:id", protect, deleteProduct);

module.exports = router;
