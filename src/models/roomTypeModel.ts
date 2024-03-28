import  { model, Schema } from "mongoose";


const RoomTypeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
},{ timestamps: true, })

let Ins;
export default Ins = new (model as any)("roomType", RoomTypeSchema);
