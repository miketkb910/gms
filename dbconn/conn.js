const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gmsbackend').then(()=>{console.log('db connection success')}).catch(err=>{console.log(err);});