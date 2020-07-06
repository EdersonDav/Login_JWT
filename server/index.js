import dotenv from "dotenv";
import express from "express";
import DB from "./database/connectedDatabase";
import router from "./routes/router";
dotenv.config();
const app = express();
DB.connect();
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server running ");
});
