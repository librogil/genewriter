const mongoose = require('mongoose');

const ThingSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    writer: String,
    date: String, 
    comments: [{writer: String, content: String, date: String, time: String}]
})

const Thing = mongoose.model('thing', ThingSchema);

module.exports = { Thing }
