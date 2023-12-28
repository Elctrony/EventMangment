const express = require('express');
const bodyParser = require('body-parser');

const app =express();
const cors = require('cors');

const events = require('./router/events');

const venues = require('./router/venues')

const auth = require('./router/auth')

const sponsors = require('./router/sponsors');
const pool = require('./db');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(events)
app.use(venues)
app.use(auth)
app.use(sponsors);

app.listen(8080,()=>{
    console.log("server is running in 8080");
})