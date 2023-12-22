const pool =require('../db');


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
