const pool = require("../db");


exports.getSponsors = async ()=>{
    try{
        let respone = await pool.query('SELECT * FROM sponsor')
        return respone.rows;
    }catch (e) {
        console.log(e);
        return -1;
    }
}

exports.addSponsorOffer = async (sponsorId,eventId,price,isVip)=>{

    try{
        const result = await pool.query(
            'INSERT INTO public.sponsoroffers(sponsorid, eventid, price, status, isvip)\n VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [sponsorId, eventId, price, 1, isVip]
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


exports.getSponsorOffers = async (eventId)=>{
    try{
        let res= await pool.query(`SELECT so.*, s.name, s.phone, s.email
                                   FROM SponsorOffers so
                                   LEFT JOIN Sponsor s ON so.sponsorid = s.id
                                   WHERE so.eventid = ${eventId}
                                   ORDER BY so.id;`);
        return res.rows;
    }catch (e){
        console.log(e);
        return -1;
    }
}