const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors')

app.use(express.json({extended: true}));
app.use(cors());

app.use("/api", require('./src/routes'))

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('conectado a mongoDB')
    server = app.listen(process.env.API_PORT, () => {
        console.log(`Aplication listening in port ${process.env.API_PORT}`)
    })    
})