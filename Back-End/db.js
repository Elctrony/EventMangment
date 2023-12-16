const Pool =require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"$Electrony1102003",
    host:"localhost",
    port: 5432,
    database:"EventPlanner"
})

module.exports= pool;