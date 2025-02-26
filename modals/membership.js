const mongoose = require('mongoose');

const membershipscheme = mongoose.Schema({
    months:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'gym',
        required:true,
    }
},{timestamps:true});

const modalmembership = mongoose.model("membership", membershipscheme);

module.exports = modalmembership;