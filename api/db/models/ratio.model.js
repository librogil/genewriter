const mongoose = require('mongoose');

const ratioSchema = new mongoose.Schema({
    value: Number
})

const Ratio = mongoose.model('ratio', ratioSchema);

module.exports = { Ratio }