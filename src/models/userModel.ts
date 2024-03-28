import {model, Schema} from 'mongoose';

const User = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    chosen : {
        type: Boolean,
        require: true,
    },
});

let Ins
export default Ins = new (model as any )("User", User);