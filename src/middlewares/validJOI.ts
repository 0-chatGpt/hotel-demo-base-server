import Util from "../controllers/utility";
const {appResponse} = new Util;
import { Response, Request, NextFunction } from "express";
import joi from "joi";

const userSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    elect: joi.boolean(),
})

export default function validateUser(req: Request, res: Response, next: NextFunction): void | Response {
    const result = userSchema.validate(req.body, {abortEarly: false, allowUnknown:true});
    if (result.error) return appResponse(res, 422, `"invalid request data ${result.error.details.map((err: any)  => err.message)}"`);

    next();
}
