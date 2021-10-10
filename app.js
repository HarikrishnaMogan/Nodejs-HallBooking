require('dotenv').config();
const cors = require('cors');
const express = require("express");
const mongo = require("./Shared/Mongo");
const RoomsRoute = require("./Routes/CreateRoom");
const bookRoute = require("./Routes/BookRoom");

const PORT = process.env.PORT || 5000
const app = express();

let server = async()=>{

  await mongo.connect();

   app.use(cors());
   app.use(express.json());

   app.use((req,res,next)=>{
       console.log("logging middleware");
       next();
   })

   app.use("/createrooms",RoomsRoute);
   app.use("/bookrooms",bookRoute);
   app.listen(PORT,()=>{console.log(`server sarted at ${PORT}`);})

}
server();