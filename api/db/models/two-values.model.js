const mongoose = require('mongoose');

const twoValueSchema = new mongoose.Schema({
    category: Number,
    longValue: String, 
    shortValue: String, 
    conditions: [String]
})

const TwoValues = mongoose.model('two-value', twoValueSchema);

module.exports = { TwoValues }