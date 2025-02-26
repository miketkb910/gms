const express = require('express');
const cp = require('cookie-parser'); 
const app = express();
const cors = require('cors');
const port = 4000;
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cp());
app.use(express.json());
require('./dbconn/conn');

const gymroutes = require('./routes/gym');
app.use('/auth',gymroutes)
const membershiproute = require('./routes/membership');
app.use('/membership',membershiproute);
const members = require('./routes/members');
app.use('/members',members);

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});