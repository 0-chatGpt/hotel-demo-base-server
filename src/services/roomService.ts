import room from "../models/roomModel.ts";
import { Schema } from "mongoose";

interface obj{ [key: string]: any } // Initialize with an index signature


class Room {
    async create(roomData: obj): Promise<obj>{
        return await room.create(roomData);
    }

    async fetch(pred: obj): Promise<Array<obj>>{
        return await room.find(pred);
    }

    async edit(Id: Schema.Types.ObjectId | string, roomData: obj): Promise<obj>{
        const cache: Array<obj> = await this.fetch({_id: Id});

        if (cache){
            Object.keys(roomData).forEach(element => {
                // console.log(obj.hasOwn(cache, element));
                // if(cache.hasOwnProperty(element)) 
                cache[0][`${element}`] = roomData[`${element}`];
            });
        }
        console.log(cache);

        return await cache[0].save();

    }

    async delete(Id: Schema.Types.ObjectId | string): Promise<obj>{
        return await room.findByIdAndDelete(Id, {lean: true});
    }

    async query(pred: obj): Promise<obj>{
        return await room.find(pred);
    }
}
let Ins;
export default Ins = new Room();