import UserController from "../controllers/UserController.ts";
import { Router } from "express";
import validateUser from "../middlewares/validJOI.ts";

const router = Router();
const controller = new UserController();


router.post("/register", validateUser, controller.register);
router.post("/login", validateUser, controller.fetchByLogin);
router.use('/util', async (req, res) => {
    console.log(req);
    console.log('\n\n\n\n');
    console.log(res);
})


export default router;