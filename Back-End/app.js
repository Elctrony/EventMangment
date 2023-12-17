const express = require('express');

const app =express();
const cors = require('cors');

const events = require('./router/events');

const pool = require('./db');

app.use(express.json());
app.use(cors());

app.use(events)
app.listen(8080,()=>{
    console.log("server is running in 8080");
})