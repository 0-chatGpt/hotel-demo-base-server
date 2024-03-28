import { Router } from "express";
const router: Router = Router();

import { IsAdmin, IsUser } from "../middlewares/authAccess.ts";
import verifyUserToken from "../middlewares/authJWT.ts";
import roomRoute from './roomRoute.ts';
import roomTypeRoute from './roomTypeRoute.ts';
import userRoute from './userRoute.ts';


router.use('/', userRoute);
router.use('/room-types', verifyUserToken, IsUser, roomTypeRoute);
router.use('/room', verifyUserToken, IsUser, roomRoute);

export default router;