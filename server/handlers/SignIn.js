const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI, PASSWORD } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getOneEvent fetches an event using the eventId sent from the request
 *  parameter from MongoDB and returns in the response the event.
 * @param request
 * @param response
 */

const SignIn = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const eventId = request.body;
  const {username, password} = request.body;

  if(password !== PASSWORD){
    return response.status(404).json({ status: 404, message: "Not Found" })
  }

  try {
    await client.connect();
    const db = client.db("calend_art");
    console.log("connected!");

    const result = await db
      .collection("users")
      .findOne({ username })
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "Admin login found" })
      : response.status(404).json({ status: 404, message: "Not Found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }finally{
    client.close();
  console.log("disconnected!");
  }
  
};

module.exports = { SignIn };