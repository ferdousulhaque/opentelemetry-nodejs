const mongoose = require("mongoose");
require("dotenv").config();

const EventModel = require("./schema");
const cacheService = require("./cacheService");

// Connection URL
const url = process.env.MONGO_URL_WDB; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Check connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  // Perform operations here (e.g., CRUD operations)
});

async function getEvents() {
  // Read
  // let events;
    let events = await EventModel.find();
    cacheService.putKey("events", JSON.stringify(events));
  // if(cacheService.getKey("events") == null){
  //   let events = await EventModel.find();
  //   cacheService.putKey(JSON.stringify(events));
  // }else{
  //   events = JSON.parse(cacheService.getKey("events"));
  // }

  return events;
}

module.exports = { getEvents };
