const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    start_date: {
        date: {
            type: Date,
            required: true,
        },
        timezone_type: {
            type: Number,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
    },
    end_date: {
        date: {
            type: Date,
            required: true,
        },
        timezone_type: {
            type: Number,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
    },
    available_seats: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    created_at: {
        date: {
            type: Date,
            required: true,
        },
        timezone_type: {
            type: Number,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
    },
    updated_at: {
        date: {
            type: Date,
            required: true,
        },
        timezone_type: {
            type: Number,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
    },
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;