import express from "express";
import { AppDataSource } from "./source";
import taskRoutes from "./routes/taskRoute";

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected successfully");
    const app = express();
    app.use(express.json());
    app.use("/api", taskRoutes);
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is listening on ${process.env.PORT || 8080}`);
    });
  })
  .catch((error) => console.log(error));
