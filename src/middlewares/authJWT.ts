import Util from "../controllers/utility";
const {appResponse} = new Util;
import { Response, Request, NextFunction } from "express";
require('dotenv').config();
import jwt from "jsonwebtoken";

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

export default function verifyUserToken(req: Request,res: Response,next: NextFunction){
    
let token: any;    
    if (typeof req.headers.auth == 'string') {
        token = req.headers.auth ? req.headers.auth.split(' ')[0]: false // appResponse(res, 409, 'OOps, auth is undefined');
}   else{return appResponse(res, 409, 'auth is not a string')}

    // console.log(token);
    if(!token) return appResponse(res, 401, "Access Denied/ Unauthorised request");

    try {
        if (token === 'null' || !token) return appResponse(res, 400, "Unauthorised request");
        const verifiedUser = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        if (!verifiedUser) appResponse(res, 401, "Unauthorised request/access");

        req.user = verifiedUser; //user or addUser, elect
        next();
    } catch (error: any) {
        return appResponse(res, 400, error.message);
    }
}