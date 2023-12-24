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
exports.getEventsById=async (id)=>{
    try{
        let res= await pool.query(`SELECT * FROM event e
                                   LEFT JOIN venue v ON e.venueid = v.id
                                   WHERE e.managerid = ${id} AND (e.venueid = v.id OR e.venueid IS NULL);
                                   `);
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

exports.addEvent = async (mangerId,name,description,date,sttime,endtime)=>{
    try{
        let res=await pool.query(`INSERT INTO public.event(
	                name, description, date, sttime, endtime, managerid)
	                VALUES ('${name}','${description}', '${date}', '${sttime}', '${endtime}', '${mangerId}');`);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
    }
}

exports.addEventVenue = async (eventid,venueid)=>{
    try{
        let res=await pool.query(`UPDATE event SET venueid=${venueid} WHERE eventid=${eventid};`);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
    }
}

