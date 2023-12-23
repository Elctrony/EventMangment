const pool =require('../db');
const bcrypt = require('bcryptjs');

exports.getAllEvents =async ()=>{
   try{
       let res= await pool.query(`SELECT * from event e, venue v where e.venueid=v.id`);
       return res.rows;
   }catch (e){
       console.log(e);
   }
}

exports.getAgenda=async (id)=>{
    try{
        let res= await pool.query(`Select * from agenda where eventid=${id}`);
        return res.rows;
    }catch (e){
        console.log(e);
    }
}

exports.addEvent = async (mangerId,name)=>{
    try{
        pool.query(`INSERT INTO Event (mangerId, Name, Description, Date, stTime, endTime, VenueID, orgTeamID) VALUES
                   (${mangerId}, ${name}, 'Annual Tech Conference', '2023-03-15', '09:00:00', '17:00:00', 1, 1`)
    }catch (e){
        console.log(e);
    }
}

exports.addEventManger =async (fname,lname,phone,email,password)=>{
    try{
        let idres= await pool.query('SELECT MAX(id) from eventmanager')

        let id = 1;
        if(idres.rows[0] && idres.rows[0].max){
            id = idres.rows[0].max+1;
        }

        let qur= 'INSERT INTO eventmanager('+
            'id, fname, lname, phone, email, password) '+
            `VALUES (${id},'${fname}' ,'${lname}', '${phone}', '${email}, ${password});`;
            console.log(qur);
        let res = await pool.query(qur)
        console.log(res);
        if(res.rows){
            return id;
        }
    }catch (e){
        console.log(e);
    }
}
