const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.mongouri);

module.exports = {connection}