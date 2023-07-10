"use strict";

const express = require("express");
const morgan = require("morgan");

const {addEvent} = require("./handlers/addevent")
const {getAllEvents} = require("./handlers/getAllEvents")
const {getOneEvent} = require("./handlers/getOneEvent")
const {deleteEvent} = require("./handlers/deleteEvent")
const {getUsers} = require("./handlers/getUsers")
const {SignIn} = require("./handlers/SignIn")

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))


  //endpoints
  .get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
  })
  
//get all events
  .get("/calend_art/events/read", getAllEvents)
//get one event
  .get("/calend_art/events/:eventId", getOneEvent)
//get users
  .get("/calend_art/users/read", getUsers)
//create an event
  .post("/calend_art/events/create", addEvent)
//Login
  .post("/calend_art/users/signin", SignIn)
//delete an event
  .delete("/calend_art/events/delete/:eventId", deleteEvent)


.use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

.listen(PORT, () => console.info(`Listening on port ${PORT}`)); 