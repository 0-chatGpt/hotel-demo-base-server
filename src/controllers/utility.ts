import {Response, Request} from 'express'


export default class Util{
    isEmptyObject(value: any): boolean{
        if (value == null) return false;
        if (typeof value !== 'object') return false;
        const proto: any = Object.getPrototypeOf(value);
        if(proto !== null && proto !== Object.prototype) return false;

        for (const prop in value){
            if (Object.hasOwn(value, prop)) return false;
        }
        
        return true;
    }

    appResponse (res: Response, statusCode: any, message?: string, data?: any): Response{
        const affirm: boolean = statusCode?.toString()?.startsWith('2');
        return res.status(statusCode).json({
            success: affirm ? true: false,
            message,
            data: data ?? null,
        });
    }
}