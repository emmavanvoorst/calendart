const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

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

const getOneEvent = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const eventId = request.params.eventId;
  
  try {
    await client.connect();
    const db = client.db("calend_art");
    console.log("connected!");

    const result = await db
      .collection("events")
      .findOne({ _id: new ObjectId(eventId) })
    result
      ? response
          .status(200)
          .json({ status: 200, data: {
            title: result.title,
            name: result.location.name,
            address: result.location.address,
            startDate: result.start_date,
            endDate: result.end_date,
            startTime: result.start_time,
            eventLink: result.url,
            desc: result.description,

          }, message: "event details" })
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

module.exports = { getOneEvent };