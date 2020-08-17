const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    role: String,
    courseId: String,
});


// Make a User Collection in DB which has the userSchema prop
module.exports = mongoose.model('User', userSchema);
