const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    username : String,
    name : String,
    email : String,
    password: String,
    dob : Date,
    age : Number,
    gender : String,
    address : String,
    color : String,
    file : String
})

const ProfileModel = mongoose.model('profile',ProfileSchema)
module.exports = ProfileModel
export {};