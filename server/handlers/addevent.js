const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addEvent = async (req, res) => {
  const event = new MongoClient( MONGO_URI, options);
  
  await event.connect();

  const db = event.db("calend_art");
  console.log("connected!");

  try {
    await db.collection("events").insertOne({ ...req.body, start_date: new Date(req.body.start_date), end_date: new Date(req.body.end_date) });
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }

  event.close();
  console.log("disconnected!");
};

module.exports = { addEvent };