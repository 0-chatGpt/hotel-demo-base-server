import roomType from "../models/roomTypeModel";

interface obj{
    [key:string]: any
}

class RoomType{
    async create(Data: object | obj): Promise<object | obj>{
        return await roomType.create(Data);
    }

    async fetchAll(): Promise<object | obj | Array<object | obj>>{
        return await roomType.find({});   
    }

    async fetch(pred: object | obj): Promise<obj>{
        return await roomType.find(pred);
    }

}
let Ins;

export default Ins = new RoomType();
