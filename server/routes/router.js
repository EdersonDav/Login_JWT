import express from "express";
import controller from "../controller/controller";
const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/all", controller.auth, controller.common);

router.get("/admin", controller.auth, controller.admin);

export default router;
