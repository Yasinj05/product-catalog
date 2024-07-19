import "reflect-metadata";
import express from "express";
import brandRoutes from "./routes/BrandRoutes";

const app = express();

app.use(express.json());
app.use("/api", brandRoutes);

export default app;
