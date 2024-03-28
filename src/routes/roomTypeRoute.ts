import RoomTypeController from "../controllers/RoomTypeController.ts";
import { Router } from "express";
import { IsAdmin } from "../middlewares/authAccess.ts";

const router = Router();
const controller = new RoomTypeController();

router.get("/", controller.AllRoomTypes);
router.post("/", IsAdmin, controller.createRoomType);

export default router;