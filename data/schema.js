const mongoose = require('mongoose')
require('dotenv').config()

// const { Schema } = mongoose;
mongoose.connect(`${process.env.database}/chess`)


const Chess_schema= new mongoose.Schema({
    guide:String ,
    lichess: [String]
})

const User_schema = new mongoose.Schema({
    id_firebase:String ,
    role: String ,
    active: Boolean,
    name:String
})
const Admin_schema = new mongoose.Schema({
    id_firebase:String ,
    role: String ,
    active: Boolean,
    name:String
})

module.exports = {   Chess_schema: mongoose.model('libs', Chess_schema)
    , User_schema : mongoose.model('users',User_schema)
    , Admin_schema: mongoose.model('admins',Admin_schema)
}