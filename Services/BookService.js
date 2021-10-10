const db = require("../Shared/Mongo");
const {ObjectId} = require('mongodb');

const service ={
    async bookrooms(req,res)
    {
         try{
             
               req.body.date = new Date(req.body.date).toDateString();
             

                //to check whether the a room is booked in clash of the timing
               let booked = await db.customers.find({
                   roomId:ObjectId(req.params.id),
                   date:req.body.date,
                    $or:[{$and:[{startTime:{$gte:req.body.startTime}}, {endTime:{$gte:req.body.startTime}}, {startTime:{$lte:req.body.endTime}}, {endTime:{$lte:req.body.endTime}}]},
                    
                    {$and:[{startTime:{$gte:req.body.startTime}}, {endTime:{$gte:req.body.startTime}}, {startTime:{$lte:req.body.endTime}}, {endTime:{$gte:req.body.endTime}}]},

                    {$and:[{startTime:{$lte:req.body.startTime}}, {endTime:{$gte:req.body.startTime}}, {startTime:{$lte:req.body.endTime}}, {endTime:{$lte:req.body.endTime}}]},

                    {$and:[{startTime:{$lte:req.body.startTime}}, {endTime:{$gte:req.body.startTime}}, {startTime:{$lte:req.body.endTime}}, {endTime:{$gte:req.body.endTime}}]}
                
                ]
               }).toArray();

               if(booked.length !==0)
               {
                   return res.send({message:"Already booked",booked});
               }
               await db.customers.insertOne({...req.body,booked:true,roomId:ObjectId(req.params.id)});
               res.send("Room booked sucessfully");
         }
         catch(err)
         {
             res.status(500).send("Server error");
             console.log(err);
         }
    },

    //to get the booked rooms details 
    async bookedrooms(req,res)
    {
        try{
               let data = await db.rooms.aggregate([
                   {$lookup:{
                       from:"customers",
                       localField:"_id",
                       foreignField:"roomId",
                       as:"customerInfo"
                   }},
                 {$project:{roomname:1,
                    "customerInfo.customerName":1,
                    "customerInfo.date":1,
                    "customerInfo.startTime":1,
                    "customerInfo.endTime":1,
                "customerInfo.booked":1
                }}

               ]).toArray();
            
               res.send(data);
        }
        catch(err)
        {
            res.status(500).send("server error");
            console.log(err);
        }
    },


    //to get customers booking info with room name
    async customerdetails(req,res)
    {
        try{
             
            let data = await db.customers.aggregate([
                {$lookup:{
                    from:"rooms",
                    localField:"roomId",
                    foreignField:"_id",
                    as: "RoomInfo"
                }},
                {$project:{customerName:1,
                "RoomInfo.roomname":1,
                "RoomInfo._id":1,
                date:1,
                startTime:1,
                endTime:1,
                _id:0
                }}
            ]).toArray();

            res.send(data);
        }
        catch(err)
        {
            res.status(500).send("server error");
            console.log(err);
        }
    }
}

module.exports = service;