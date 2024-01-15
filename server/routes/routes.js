import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getInvoiceById,
  updateInvoice,
} from "../controller/InvoiceController.js";
import {
  addPembayaran,
  cetakPembayaran,
  deletePembayaran,
  getPembayaran,
} from "../controller/PembayaranController.js";
const router = express.Router();

// Login
router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

// Invoice
router.get("/invoices", getInvoice);
router.get("/invoices/:id", getInvoiceById);
router.post("/invoices", addInvoice);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

// Pembayaran
router.get("/pembayaran", getPembayaran);
router.post("/pembayaran", addPembayaran);
router.delete("/pembayaran/:id", deletePembayaran);
router.get("/cetakPembayaran/:id", cetakPembayaran);

// next:

export default router;
