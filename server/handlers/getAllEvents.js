const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "e-commerce";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Function to retrieve companies from the database.
const getAllEvents = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("calend_art");
    console.log("connected!");

  try {
    const eventsCollection = db.collection("events");

    console.log("Retrieving events...");

    // Fetch all events from the collection
    const events = await eventsCollection.find().toArray();

    // Send the events as a JSON response.
    res.status(200).json({ status: 200, events });
    
  } catch (error) {
    console.error("An error occurred while retrieving events:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }

    client.close();
    console.log("disconnected!");
  };

module.exports = { getAllEvents };
  