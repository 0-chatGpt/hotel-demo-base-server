import UTIL from './utility.ts';
const {isEmptyObject, appResponse} = new UTIL();
import service from '../services/roomService.ts';
import roomTypeService from '../services/roomTypeService.ts';
import { Response, Request } from 'express';
import mongoose from 'mongoose';

interface obj {
    [key: string]: any
};

export default class RoomController{
    async fetchRoom(req: Request, res: Response): Promise<Response>{
        try {
            const Id = req.params.roomId
            const room = await service.fetch({_id: Id});
 
            return appResponse(res, 201, "Room is available", room);
 
         } catch (error: any) {
             const errorMessage = error.message;
             return appResponse(res, 401, errorMessage);
         }
    }

    async createRoom(req: Request,res: Response): Promise<Response | undefined>{
        try {
            const data = {...req.body};
            const Type = await roomTypeService.fetch({name: data.roomType.toLowerCase()});
            if (Type.length < 1) return appResponse(res, 302, "RoomType does not exist");
            if(!isEmptyObject(data)){
                data._id = new mongoose.Types.ObjectId();
                // if ('_id' in Type)
                data.roomType = Type[0]._id;
                console.log('Just Before');
                const addRoom = await service.create(data);
                console.log('Reached here');
                if (addRoom) return appResponse(res, 200, "Resource created successfully.", addRoom);

                return appResponse(res, 300, "Create room failed");
            };
            
        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomTrash(req: Request,res: Response): Promise<Response>{
        try {
            const Id = req.params.roomId;
            let room = await service.delete(Id);

            if (room) return appResponse(res, 200, "Entry Deleted", room);

            return appResponse(res, 300, "Item does not exist");
        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomEdit(req:Request,res: Response): Promise<Response>{
        try {
            const data: object | obj = {...req.body};
            let changes = await service.edit(req.params.roomId, data);

            if (!changes) return appResponse(res, 400, "Update unsucessful, check parameters");
            return appResponse(res, 200, "Update Successful");
        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomByQuery(req: Request,res: Response): Promise<Response>{
        try {
            const filter = {...req.query};
            let command: obj = {};

            if (!isEmptyObject(filter)){
                if (filter.search) command.name = filter.search;
                if (filter.roomType) command.roomType = filter.roomType;
                if ((filter.minPrice)) command.price = {$gt: Number(filter.minPrice)};    
                if ((filter.maxPrice ? filter.maxPrice: Boolean(false)) > (filter.minPrice ? filter.minPrice : 0 )){
                    if (filter.maxPrice) command.price = { $lt: Number(filter.maxPrice), $gt: 0};
                    if (filter.minPrice) command.price = { $gt: Number(filter.minPrice), $lt: Number(filter.maxPrice)};}
        
                    
                if(!isEmptyObject(command)){
                    const roomResult = await service.query(command);
                    if(roomResult.length > 0) return appResponse(res, 201, "Room is available");
                }
                return appResponse(res, 300, "Query unsucessful");
            }
            return appResponse(res, 400, "Its from the user" + filter);

        } catch (error: any) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }
};

