import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import connectDB from "./config/db";
import { APP_PORT } from "./config/config";
import { setRoutes } from "./routes";
import { errorConverter, errorHandler } from "./utlis/error";

dotenv.config();

const app = express();
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

setRoutes(app);

app.use(errorConverter);
app.use(errorHandler);

// Start server
const port = APP_PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
