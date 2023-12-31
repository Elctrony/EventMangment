const pool =require('../db');
const bcrypt = require('bcryptjs');
const events = require("events");

exports.getAllEvents =async ()=>{
   try{
        let res= await pool.query(`SELECT ${''} e.*, v.name AS venue_name, og.name AS organizing_team_name
                                  FROM event e
                                  LEFT JOIN venue v ON e.venueid = v.id
                                  LEFT JOIN organizingteam og ON e.orgteamid = og.id
                                  WHERE (e.venueid = v.id OR e.venueid IS NULL) AND (e.orgteamid = og.id OR e.orgteamid IS NULL); `);
       return res.rows;
   }catch (e){
       console.log(e);
       return -1;
   }
}
exports.getEventsByManagerId=async (id)=>{
    try{
        let query=`SELECT e.*, v.name AS venue_name, og.name AS organizing_team_name
                                   FROM event e
                                            LEFT JOIN venue v ON e.venueid = v.id
                                            LEFT JOIN organizingteam og ON e.orgteamid = og.id
                                   WHERE e.managerid = ${id} AND (e.venueid = v.id OR e.venueid IS NULL) AND (e.orgteamid = og.id OR e.orgteamid IS NULL);
                                   `;
        console.log(query);
        let res= await pool.query(query);
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.getEventsByOrganizingId = async (id)=>{
    try{
        let res= await pool.query(`SELECT e.*, v.name AS venue_name, og.name AS organizing_team_name
                                   FROM event e
                                            LEFT JOIN venue v ON e.venueid = v.id
                                            LEFT JOIN organizingteam og ON e.orgteamid = og.id
                                   WHERE e.orgteamid = ${id} AND (e.venueid = v.id OR e.venueid IS NULL) AND (e.orgteamid = ${id});
                                   `);
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}


exports.getAgenda=async (id)=>{
    try{
        let res= await pool.query(`SELECT ag.*, s.fname,s.lname
                                   FROM Agenda ag JOIN Speaker s ON ag.speakerid = s.id
                                   WHERE ag.eventid = ${id}`);
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}
exports.getAgendaBySpeaker=async (id)=>{
    try{
        let res= await pool.query(`Select * from agenda where speakerid=${id}`);
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addEvent = async (mangerId,name,description,date,sttime,endtime)=>{
    try{
        let res=await pool.query(`INSERT INTO public.event(
	                eventname, description, date, sttime, endtime, managerid)
	                VALUES ('${name}','${description}', '${date}', '${sttime}', '${endtime}', '${mangerId}');`);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addEventVenue = async (eventid,venueid)=>{
    try{
        let res=await pool.query(`UPDATE event SET venueid=${venueid} WHERE eventid=${eventid};`);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addEventOrganizing = async (eventid,orgteamid)=>{
    try{
        let res=await pool.query(`UPDATE event SET orgteamid=${orgteamid} WHERE eventid=${eventid};`);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
        return -1;

    }
}


exports.addSession = async (eventData)=>{

    try{
        let qur= `INSERT INTO agenda( eventid, sttime, duration, description, speakerid)
	                            VALUES (${eventData.eventid}, '${eventData.sttime}', ${eventData.duration}, '${eventData.description}', ${eventData.speakerid});`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }

}

exports.removeSession = async (sessionId)=>{
    try{
        let qur= `DELETE FROM agenda
	                        WHERE sessionid=${sessionId}`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addExpenses = async (eventid,name,qty,price,description,type)=>{
    try{
        let qur= `INSERT INTO public.expenses(eventid, itemname, quantity, price, description,"expensesType")
	                     VALUES (${eventid}, '${name}', ${qty}, ${price}, '${description}',${type});`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res);
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.getExpensesId = async (eventId)=>{
    try{
        let qur= `SELECT * FROM expenses WHERE eventid=${eventId};`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}


exports.deleteExpenese =async (expeneseId)=>{
    try{
        let qur= `DELETE FROM expenses WHERE id=${expeneseId};`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}


exports.deleteEvent=async (eventID)=>{
    try{
        let qur= `DELETE FROM event WHERE eventid=${eventID};`
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.getOrganizingTeam = async ()=>{
    try{
        let qur= "SELECT * FROM organizingteam";
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.getAttendees=async (eventid)=>{
    try{
        let qur= `SELECT * FROM attendee WHERE eventid = ${eventid};`;
        console.log(qur);
        let res=await pool.query(qur);
        console.log(res)
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addAttendee = async (fname, lname, phone, email, eventid)=>{

    try{
        const result = await pool.query(
            'INSERT INTO Attendee (Fname, Lname, Phone, Email, eventid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [fname, lname, phone, email, eventid]
        );
        console.log(result);
        const newAttendee = result.rows[0];
        console.log(newAttendee)
        return newAttendee;
    }catch (e){
        console.log(e);
        return -1;
    }

}

exports.deleteAttendee =async (attendeeId)=>{
    try{
        const result = await pool.query(
           `DELETE FROM public.attendee WHERE id=${attendeeId};`);
        console.log(result);
        return result;
    }catch (e){
        console.log(e);
        return -1;
    }
}