const route = require("express").Router();
const { application } = require("express");
const service = require("../Services/BookService");

route.post("/:id",service.bookrooms);

route.get("/rooms",service.bookedrooms);
route.get("/customers",service.customerdetails);

module.exports = route;