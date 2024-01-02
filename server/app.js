import express from "express";
const app = express();
import dotenv from "dotenv";
import db from "./config/db.js";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const PORT = 5000 || process.env.PORT;

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server Is Running in ${PORT}`);
});
