import express from "express";
import { AppDataSource } from "./source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected successfully");
    const app = express();
    app.use(express.json());
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
