const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/**
 * updateItemQuantityCart updates the quantity of an item in the cart
 * @param request
 * @param response
 */
const updateEvent = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
  
    const {
      title,
      name,
      address,
      startDate,
      endDate,
      startTime,
      eventLink,
      description,
    } = request.body;
  
    try {
      await client.connect();
      const db = client.db("calend_art");
      console.log("connected!");
  
      // Update logic
      const eventId = request.params.eventId; 
      const filter = { _id: new ObjectId(eventId) }; 
  
      const update = {
        $set: {
          title,
          name,
          address,
          startDate,
          endDate,
          startTime,
          eventLink,
          description,
          start_date: new Date(startDate),
          end_date: new Date(endDate),
        },
      };
 
      const options = { returnOriginal: false };
      const result = await db
        .collection("events")
        .updateOne(filter, update, options);
        console.log(result)
      if (!result.matchedCount) {
        // Handle case where the event was not found
        return response.status(404).json({ message: "Event not found" });
      }
      if (!result.modifiedCount) {
        // Handle case where the event was not found
        return response.status(502).json({ message: "Event not updated" });
      }
   
      response.status(200).json({ status: 200, message: "successfully updated" });
    } catch (error) {
      console.log(error)
      response.status(500).json({ status: 500, message: error.message });
    } finally {
      client.close();
      console.log("disconnected!");
    }
  };
  
  module.exports = { updateEvent };