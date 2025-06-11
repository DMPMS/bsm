import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import countryRoutes from "./routes/countryRoutes";
import managerglobalRoutes from "./routes/managerglobalRoutes";
import positionRoutes from "./routes/positionRoutes";
import playerglobalRoutes from "./routes/playerglobalRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", countryRoutes);
app.use("/api", managerglobalRoutes);
app.use("/api", positionRoutes);
app.use("/api", playerglobalRoutes);

export default app;
