import dotenv from "dotenv";
import express from "express";
import router from "./routes/router";
dotenv.config();
const app = express();

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server running ");
});
