const mongoose = require('mongoose');

const memberschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
    },
    membership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'membership',
        required:true,
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'gym',
        required:true,
    },
    status:{
        type:String,
        default:'active',
    },
    lastpayment:{
        type:Date,
        default:new Date(),
    },
    nextbilldate:{
        type:Date,
        required:true,
    },
},{timestamps:true});

const modaluser = mongoose.model("member",memberschema);
module.exports = modaluser;