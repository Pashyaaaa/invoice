import db from "../config/db.js";
import Users from "./UserModel.js";
import Invoice from "./InvoiceModel.js";
import Pembayaran from "./PembayaranModel.js";

const invoice = db.define("invoice", Invoice, {
  tableName: "invoice",
  timestamps: false,
  timezone: "+07:00",
});

const pembayaran = db.define("pembayaran", Pembayaran, {
  tableName: "pembayaran",
  timestamps: false,
  timezone: "+07:00",
});

invoice.hasMany(pembayaran, {
  foreignKey: "invoice_id",
  as: "pembayaran",
});

pembayaran.belongsTo(invoice, {
  foreignKey: "invoice_id",
  as: "invoice",
});

db.define("users", Users, {
  tableName: "users",
  freezeTableName: true,
  timestamps: false,
  timezone: "+07:00",
});
db.sync();

export default db;
