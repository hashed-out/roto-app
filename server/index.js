const express = require('express');
const mongoose = require('mongoose');
require('./models/user');
const port=5000

const app=express();


require('dotenv').config();

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log('connected to database');
    }
)
    .catch((err) => {
        console.log(`Could not connect to db ` + err);
    })

const authRoutes = require('./routes/authRoutes');
const bodyParser=require('body-parser');


app.use(bodyParser.json());
app.use(authRoutes);

app.get('/', (req, res)=>{
    res.send("kaise ho");
});

app.listen(port, ()=>{
    console.log("chuti kar")
});