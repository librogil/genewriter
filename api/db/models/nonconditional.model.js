const mongoose = require('mongoose');

const nonconditionalSchema = new mongoose.Schema({
    category: Number,
    value: String
})

const Nonconditional = mongoose.model('nonconditional', nonconditionalSchema);

module.exports = { Nonconditional }