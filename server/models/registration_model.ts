const mongoose = require("mongoose")

const RegistrationSchema = new mongoose.Schema({
    username : String,
    address : String,
    gender : String,
    password : String
})

const RegistrationModel = mongoose.model('registration', RegistrationSchema);
module.exports = RegistrationModel
export {};