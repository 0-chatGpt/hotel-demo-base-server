import UTIL from './utility.ts';
const {isEmptyObject, appResponse} = new UTIL();
import { Response, Request } from 'express';
import service from '../services/roomTypeService.ts';
import mongoose from 'mongoose';

interface obj{
    [key: string]: any
}

export default class RoomTypeController{
    async AllRoomTypes(req: Request,res: Response): Promise<Response>{
        try {
            const data = await service.fetchAll();
            if (!data) return appResponse(res, 300,  "No records");
            return appResponse(res, 201, "Fetched Data success", data);
        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async createRoomType(req: Request,res: Response): Promise<Response>{
        try {
            const data: obj = {...req.body};
            if (!isEmptyObject(data)){
                if(data.hasOwnProperty("_id")){ data._id ? data._id : data._id = new mongoose.Types.ObjectId();}else{
                    data._id = new mongoose.Types.ObjectId();
                }
                const existing = await service.fetch({name: data.name});

                if (!existing) return appResponse(res, 403, "Room Type already exists");
                

                const addRoomType = await service.create(data);
                return appResponse(res, 201, "RoomType created Successfully", addRoomType);
            }

            return appResponse(res, 300, "data is empty", data);
        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }
};


