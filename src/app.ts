import express = require("express");
import cors = require("cors");
import db = require("./database/database.ts");
import indexRoute from "./routes/indexRoute.ts";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

db(true);

app.use('/api/v1', indexRoute);


app.listen(process.env.PORT, ()=>{
    console.log(`app listening on port ${process.env.PORT}`);
})

