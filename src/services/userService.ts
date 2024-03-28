import model from '../models/userModel.ts';


interface obj{
    [key: string]: any
}

class UserService{
    async create(data: object): Promise<object | obj>{
        return await model.create(data);
    }

    async fetch(pred: object): Promise<obj>{
        return await model.find(pred);
    }
}; 

let Ins: any;
export default Ins = new UserService();