import express from "express";
import cors from "cors";
import gpsRoutes from "./routes/gpsRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/gps", gpsRoutes);

export default app;
