import "reflect-metadata";
import express from "express";
import brandRoutes from "./routes/BrandRoutes";
import categoryRoutes from "./routes/CategoryRoutes";

const app = express();

app.use(express.json());
app.use("/api", brandRoutes);
app.use("/api", categoryRoutes);

export default app;
