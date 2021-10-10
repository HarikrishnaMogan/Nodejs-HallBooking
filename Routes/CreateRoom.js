const route = require("express").Router();
const service = require("../Services/RoomsService");


route.post("/",service.createRooms);

module.exports=route;