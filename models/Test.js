const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const test = new Schema({
    name: { type: String, required: true },
    body: { type: Number, required: true  }
});



module.exports = mongoose.model('tests', test);