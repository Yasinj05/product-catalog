import "reflect-metadata";
import express from "express";
import brandRoutes from "./routes/BrandRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import itemRoutes from "./routes/ItemRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api", brandRoutes);
app.use("/api", categoryRoutes);
app.use("/api", itemRoutes);

app.use(errorHandler);

export default app;
