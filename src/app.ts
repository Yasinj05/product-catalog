import "reflect-metadata";
import express from "express";
import brandRoutes from "./routes/BrandRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import itemRoutes from "./routes/ItemRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./utils/swaggerConfig";

const app = express();

// Middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.use("/api", brandRoutes);
app.use("/api", categoryRoutes);
app.use("/api", itemRoutes);

// Swagger setup
setupSwagger(app);

export default app;
