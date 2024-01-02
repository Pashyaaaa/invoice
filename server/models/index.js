import db from "../config/db.js";
import Users from "./UserModel.js";

db.define("users", Users, {
  tableName: "users",
  freezeTableName: true,
  timestamps: false,
  timezone: "+07:00",
});
db.sync();

export default db;
