const pool =require('../db');


const getAllEvents =async ()=>{
   try{
       let res= await pool.query(`SELECT * from event`);
       return res.rows;
   }catch (e){
       console.log(e);
   }
}

export {getAllEvents}