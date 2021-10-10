const db = require("../Shared/Mongo");

let service={
    
    async createRooms(req,res)
    {
        try{
           let data= await db.rooms.insertOne(req.body);
            res.send({message:"Room is created sucessfully",data});
        }
        catch(err)
        {
            res.status(500).send("server error");
        }
       
    }
    
}
module.exports = service;