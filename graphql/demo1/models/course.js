const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    price: String,
});


// Make a Course Collection in DB which has the courseSchema prop
module.exports = mongoose.model('Course', courseSchema);
