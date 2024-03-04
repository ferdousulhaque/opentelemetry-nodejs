const mongoose = require("mongoose");
require("dotenv").config();

const EventModel = require("./eventModel");

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

function seedEvents() {
  let events = [];
  // Create a sample event
  const Event = new EventModel({
    id: 2,
    name: "Event 2",
    description: "Description for event 2",
    location: "Location 2",
    start_date: {
      date: new Date("2024-03-28T15:36:57.000Z"),
      timezone_type: 3,
      timezone: "UTC",
    },
    end_date: {
      date: new Date("2024-04-13T15:36:57.000Z"),
      timezone_type: 3,
      timezone: "UTC",
    },
    available_seats: 35,
    price: 30.1,
    active: false,
    created_at: {
      date: new Date("2024-02-29T15:36:57.000Z"),
      timezone_type: 3,
      timezone: "UTC",
    },
    updated_at: {
      date: new Date("2024-02-29T15:36:57.000Z"),
      timezone_type: 3,
      timezone: "UTC",
    },
  });

  // Save the sample event
  Event
    .save()
    .then((result) => {
      console.log("Sample event saved:", result);
    })
    .catch((error) => {
      console.error("Error saving sample event:", error);
    })
    .finally(() => {
      // Disconnect from MongoDB after saving
      mongoose.disconnect();
    });

  return events;
}

module.exports = {
  seedEvents
}