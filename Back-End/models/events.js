const pool =require('../db');


exports.getAllEvents =async ()=>{
   try{
       let res= await pool.query(`SELECT * from event`);
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
