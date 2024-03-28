import Util from "../controllers/utility";
const {appResponse} = new Util;
import { Response, Request, NextFunction } from "express";

interface obj{
    [key: string]: any
}

declare global {
    namespace Express {
        interface Request {
            user?: obj | string; // Assuming User is the type of req.user
        }
    }
}


export const IsUser = function(req: Request, res: Response, next: NextFunction): void | Response{
    if (typeof req.user === 'object' && req.user !== null && 'chosen' in req.user){
    if(Boolean(req.user.chosen) >= false){
        next();
    }
    }else{
        return appResponse(res, 401, "User Unauthorised");
    }
}


export const IsAdmin = function(req: Request, res: Response, next: NextFunction): void | Response{
    if (typeof req.user === 'object' && req.user !== null && 'chosen' in req.user){
        if(Boolean(req.user.chosen) > false){
            next();
        }
    }else{
        return appResponse(res, 401, "Admin Unauthorised");
    }
}

