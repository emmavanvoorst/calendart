const {MongoClient, ObjectId} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

/**
 * Delete an event
 * @param request
 * @param response
 */

const deleteEvent = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    const eventId = request.params.eventId;
  
    try {
      await client.connect();
      const db = client.db("calend_art");
      console.log("Connected!");
  
      // Check if the event exists in events collection
      const eventCheck = await db.collection("events").findOne({_id: new ObjectId(eventId) });

      if (!eventCheck) {
        response.status(404).json({
          status: 404,
          message: "Event not found.",
        });
        return;
      }
  
      // Delete the event from the cart
      await db.collection("events").deleteOne({_id: new ObjectId(eventId) });
  
      response.status(200).json({
        status: 200,
        message: "Event deleted.",
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        status: 500,
        message: "Server error",
      });
    } finally {
      client.close();
      console.log("Disconnected!");
    }
  };
  
  module.exports = { deleteEvent };