import mongoose = require("mongoose");
require("dotenv").config();


function db(remote: boolean) : void{
    try {
        if(remote){
            mongoose.connect(`${process.env.DATABASE_URL}`, {family: 4}).then(forw => console.log("Database connected successfully! "));
        }else{
            mongoose.connect(`${process.env.DATABASE_URL_LOCAL}`, {family: 4}).then(forw => console.log("Database connected successfully! "));
        }
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
};


export = db;