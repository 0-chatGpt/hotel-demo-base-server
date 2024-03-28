import UserController from "../controllers/UserController.ts";
import { Router } from "express";
import validateUser from "../middlewares/validJOI.ts";

const router = Router();
const controller = new UserController();


router.post("/register", validateUser, controller.register);
router.post("/login", validateUser, controller.fetchByLogin);


export default router;