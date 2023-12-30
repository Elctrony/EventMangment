const pool = require("../db");

exports.addEventManager =async (fname,lname,phone,email,password)=>{
    try{

        let qur = `SELECT insert_event_manager('${fname}', '${lname}', '${phone}', '${email}', '${password}');`
        console.log(qur);
        let res = await pool.query(qur)
        console.log(res.rows);
        if(res.rows){
            return res.rows[0].id;
        }
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.getEventManager =async (email)=>{

    try{

        let qur= `SELECT * FROM get_event_manager_by_email('${email}');`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        let result= res.rows.map((row)=>{
          return {
              id: row.Id,
              fname: row.Fname,
              lname: row.Lname,
              phone: row.Phone,
              email: row.Email,
              password: row.Password
          }
        })
        return result[0];

    }catch (e){
        console.log(e);
        return -1
    }

}

exports.getOrganizing =async (id)=>{

    try{

        let qur= `SELECT * FROM get_organizing_team_by_id(${id});`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        let result= res.rows.map((row)=>{
            return {
                id: row.Id,
                name: row.name,
                hiringcost: row.HiringCost,
                rate: row.Rate,
                password: row.Password
            }
        })
        return result[0];

    }catch (e){
        console.log(e);
        return -1;
    }

}


exports.getSponsor =async (id)=>{

    try{

        let qur= `SELECT * FROM get_sponsor_by_id(${id})`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        let result= res.rows.map((row)=>{
            return {
                id: row.Id,
                name: row.Name,
                phone: row.Phone,
                email: row.Email,
                password: row.Password
            }
        })
        return result[0];

    }catch (e){
        console.log(e);
        return -1;
    }

}



exports.getSpeaker =async (id)=>{

    try{

        let qur= `SELECT * FROM get_speaker_by_id(${id});`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        let result= res.rows.map((row)=>{
            return {
                id: row.Id,
                fname: row.Fname,
                lname: row.Lname,
                phone: row.Phone,
                email: row.Email,
                password: row.Password,
                regPassword: row.RegPassword
            }
        })
        return result[0];

    }catch (e){
        console.log(e);
        return -1;
    }

}

exports.getSpeaker =async (id)=>{
    try{
        let qur = `SELECT * FROM Speaker WHERE id = ${id}`;
        console.log(qur);
        let res = await pool.query(qur);
        if(!res||!res.rows||!res.rows[0]){
            return -1;
        }
        console.log(res.rows);
        return res.rows[0];
    }catch (e){
        console.log(e);
        return -1;
    }

}