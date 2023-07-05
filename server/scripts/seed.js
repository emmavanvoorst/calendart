const { MongoClient } = require("mongodb");
const data = require("../data/events.json")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seedData = async () => {
    console.log(MONGO_URI)
  const event = new MongoClient(MONGO_URI, options);
  
  await event.connect();

  const db = event.db("calend_art");
  console.log("connected!");

  try {
    await db.collection("events").insertMany(data.map((event) => ({ ...event, start_date: new Date(event.start_date), end_date: new Date(event.end_date) })));
  } catch (error) {
   console.log(error)
  }

  event.close();
  console.log("disconnected!");
};

seedData()