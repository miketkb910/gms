const mongoose = require('mongoose');

const gymschema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gymname:{
        type:String,
        required:true
    },
    resetpasswordtoken:{
        type:String
    },
    resetpasswordexpires:{
        type:Date
    },
},{timestamps:true});

const modal = mongoose.model("gym",gymschema);

module.exports = modal;