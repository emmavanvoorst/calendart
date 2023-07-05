const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addLocation = async (req, res) => {
  const event = new MongoClient(MONGO_URI, options);

  const {title, } = req.body

  await event.connect();

  const db = event.db('CalendArt');
  console.log("connected!");

  try {
    await db.collection('locations').insertOne({title});
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }

  client.close();
  console.log("disconnected!");
};

module.exports = { addLocation };