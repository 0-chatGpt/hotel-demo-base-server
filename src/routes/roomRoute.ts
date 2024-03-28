import RoomController from "../controllers/RoomController";
import { Router } from "express";
import { IsAdmin } from "../middlewares/authAccess";

const router:Router = Router();
const controller = new RoomController();


router.get("/", controller.roomByQuery);
router.get("/:roomId", controller.fetchRoom);
router.post("/", IsAdmin, controller.createRoom);
router.patch("/:roomId", IsAdmin, controller.roomEdit);
router.delete("/:roomId", IsAdmin, controller.roomTrash);

export default router;