const mongoose = require("mongoose");
require("dotenv").config();

const EventModel = require("./eventModel");
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
    let events;
    let available_cache = await cacheService.get("events");
    // console.log(available_cache);
    if(available_cache == null){
        events = await EventModel.find();
        cacheService.set("events", JSON.stringify(events));
        events = {
            cached: 0,
            events
        }
    }else{
        events = JSON.parse(available_cache);
        events = {
            cached: 1,
            events
        }
    }

    return events;
}

module.exports = { getEvents };