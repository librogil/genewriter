const mongoose = require('mongoose');

const conditionalSchema = new mongoose.Schema({
    category: Number,
    longValue: String, 
    shortValue: String, 
    conditions: [String]
})

const Conditional = mongoose.model('conditional', conditionalSchema);

module.exports = { Conditional }