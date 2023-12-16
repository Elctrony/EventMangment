const express = require('express');

const app =express();
const cors = require('cors');

const pool = require('./db');

app.use(express.json());
app.use(cors());

//pool.query("INSERT INTO users")



/*
INSERT INTO Persons (PersonID, LastName,FirstName, Address, City,)
VALUES (123456, 'Tom B. Erichsen', 'Skagen 21', 'Stavanger',  'Norway');
*/

// app.listen(8080,()=>{
//     console.log("server is running in 8080");
// })