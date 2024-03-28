import UTIL from './utility.ts';
const {isEmptyObject, appResponse} = new UTIL();
import { Response, Request } from 'express';
require("dotenv").config();
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import service from '../services/userService.ts';

interface obj{
    [key:string]: any
}

export default class UserController{
    async register(req: Request, res: Response): Promise<Response>{
        try {
            const data: obj  = {...req.body};
            console.log(data);
            if (!isEmptyObject(data)){
                const salt = await bcrypt.genSalt(10);
                const hasPassword = await bcrypt.hash(req.body.password, salt);
                data.password = hasPassword;
                console.log(data.chosen);
                data.chosen = data.chosen ? data.chosen : false;
                const addUser = await service.create(data);
                if(!addUser) return appResponse(res, 300, "Resource creation failed");
                if('_id' in addUser) {
                    let payload = {id: addUser._id, chosen: data.chosen || 0};
                    const token = jwt.sign(payload, `${process.env.TOKEN_SECRET}`);
                    return appResponse(res, 200, `Token: ${token}`, addUser);
                }
            }
            throw new Error("request body is empty");
        } catch (error: any) {
            return appResponse(res, 432, error.message);
        }
    }

    async fetchByLogin(req: Request, res: Response){
        try {
            const data: obj = {...req.body};
            if (!isEmptyObject(data)){
                const user = await service.fetch({$or:[{name:data.name}, {email:data.email}]});
                if (user[0]){
                    const validPass = await bcrypt.compare(data.password, user[0].password);
                    if(!validPass) return appResponse(res, 401, "Name/Email or Password is wrong");

                    let payload = {id: user[0]._id, chosen: user[0].chosen || 0};
                    const token = jwt.sign(payload, `${process.env.TOKEN_SECRET}`);
                    res.header("auth", token);
                    return appResponse(res, 200, `Token: ${token}`, user);
                }
                return appResponse(res, 401, "invalid enquiry");
            }
            throw new Error("request body is empty");
        } catch (error: any) {
            return appResponse(res, 302, error.message);
        }
    }
};
