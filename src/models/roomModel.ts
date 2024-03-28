import roomType from "./roomTypeModel.ts";
import  {model, Schema} from "mongoose";


const RoomSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: roomType,
    },
    price: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
});


let Ins;
export default Ins = new (model as any)("room", RoomSchema);
console.log(typeof roomType);