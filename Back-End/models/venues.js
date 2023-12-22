const pool =require('../db');


exports.getAllVenue =async ({location,price,rating})=>{
    console.log(location)
    console.log(price)
    console.log(rating)

    try{
        let query= "SELECT * from venue ";
        if(location||price||rating){
            query = query+'where';
        }
        let flg=0;
        if(location){
            query= query+` location = '${location}'`;
            flg=1;
        }
        if(price){
            if(flg){
                query = query+' AND ';
                flg=0;
            }
            query=query+` priceperhour <= ${price}`;
            flg=1;
        }
        if(rating){
            if(flg){
                query = query+' AND ';
            }
            query=query+` rating >=${rating}`;
        }
        console.log(query);
        let res= await pool.query(query);
        return res.rows;
    }catch (e){
        console.log(e);
    }
}

exports.getVenusFilter = async ()=>{
    try{
        let res= await pool.query(`Select distinct(location) from venue`);
        return res.rows;
    }catch (e){
        console.log(e);
    }
}
