const pool = require("../db");

exports.addEventManager =async (fname,lname,phone,email,password)=>{
    try{

        let qur= "INSERT INTO eventManager (Fname, Lname, Phone, Email, Password) VALUES"
            +` ('${fname}' ,'${lname}', '${phone}', '${email}', '${password}');`;
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

        let qur= `SELECT * FROM eventmanager where email= '${email}'`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        return res.rows[0];

    }catch (e){
        console.log(e);
        return -1
    }

}

exports.getOrganizing =async (id)=>{

    try{

        let qur= `SELECT * FROM organizingteam where id= ${id}`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        return res.rows[0];

    }catch (e){
        console.log(e);
        return -1;
    }

}


exports.getSponsor =async (id)=>{

    try{

        let qur= `SELECT * FROM sponsor where id= ${id}`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        return res.rows[0];

    }catch (e){
        console.log(e);
        return -1;
    }

}



exports.getSpeaker =async (id)=>{

    try{

        let qur= `SELECT * FROM speaker where id= ${id}`;
        console.log(qur);
        let res = await pool.query(qur)
        if(!res||!res.rows){
            return -1;
        }
        console.log(res.rows);
        return res.rows[0];

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