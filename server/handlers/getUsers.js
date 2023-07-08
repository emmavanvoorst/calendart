const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "calend_art";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Function to retrieve users from the database.
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("calend_art");
    console.log("connected!");

  try {
    const usersCollection = db.collection("users");

    console.log("Retrieving users...");

    // Fetch all users from the collection
    const users = await usersCollection.find().toArray();

    // Send the users as a JSON response.
    res.status(200).json({ status: 200, users });
    
  } catch (error) {
    console.error("An error occurred while retrieving users:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }finally{
    client.close();
    console.log("disconnected!");
  }

    
  };

module.exports = { getUsers };