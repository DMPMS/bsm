import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import countryRoutes from "./routes/country.routes";
import managerglobalRoutes from "./routes/managerglobal.routes";
import positionRoutes from "./routes/position.routes";
import playerglobalRoutes from "./routes/playerglobal.routes";
import teamglobalRoutes from "./routes/teamglobal.routes";
import ruleRoutes from "./routes/rule.routes";
import competitionglobalRoutes from "./routes/competitionglobal.routes";
import settingsglobalRoutes from "./routes/settingsglobal.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", countryRoutes);
app.use("/api", managerglobalRoutes);
app.use("/api", positionRoutes);
app.use("/api", playerglobalRoutes);
app.use("/api", teamglobalRoutes);
app.use("/api", ruleRoutes);
app.use("/api", competitionglobalRoutes);
app.use("/api", settingsglobalRoutes);

export default app;
