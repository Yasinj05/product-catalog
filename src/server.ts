import "reflect-metadata";
import { AppDataSource } from "./utils/db";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
