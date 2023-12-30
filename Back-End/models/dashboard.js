const pool = require("../db");


exports.addOrganizingTeam =async (name,cost,rate,password)=>{
    try{
        let qur = `SELECT * FROM insert_organizing_team('${name}', '${cost}', '${rate}', '${password}');`
        const result = await pool.query(qur);
        console.log(result);

        const newTeam = result.rows.map((row)=>{
            return {
                id:row.Id,
                name: row.Name,
                hiringcost: row.HiringCost,
                rate: row.Rate,
                password: row.Password
            }
        });
        console.log(newTeam[0])

        return newTeam[0];
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addVenue =async (name,location,capacity,price,rating)=>{
    try{
        let qur = `SELECT * FROM insert_venue('${name}', '${location}', ${capacity},  ${price},  ${rating});`
        const result = await pool.query(qur);
        const newTeam = result.rows.map((row)=>{
            return {
                id:row.Id,
                name: row.Name,
                location: row.Location,
                capacity: row.Capacity,
                pricePerHour: row.PricePerHour,
                rating:row.Rating
            }
        });
        console.log(newTeam)
        return newTeam[0];
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addSpeaker = async (fname, lname, phone, email,password,regPassword) => {
    try {
        const result = await pool.query('SELECT * FROM insert_speaker($1, $2, $3, $4, $5, $6);', [fname, lname, phone, email,password,regPassword]);
        console.log(result);
        const newSpeaker = result.rows.map((row)=>{
            return {
                id:row.Id,
                fname: row.Fname,
                lname: row.Lname,
                phone: row.Phone,
                email: row.Email,
                password: row.Password,
                regpassword: row.Regpassword
            }
        })
        console.log(newSpeaker);
        return newSpeaker[0];
    } catch (e) {
        console.error(e);
        return -1;
    }
};


exports.addSponsor = async (name, phone, email, password) => {
    try {

        const result = await pool.query(
            'INSERT INTO public.sponsor(name, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, email, password]
        );
        console.log(result);
        const newSponsor = result.rows[0];
        console.log(newSponsor);
        return newSponsor;
    } catch (e) {
        console.error(e);
        return -1;
    }
};


exports.deleteVenue = async (venueId) => {
    try {
        const result = await pool.query('DELETE FROM public.venue WHERE id = $1 RETURNING *', [venueId]);
        const deletedVenue = result.rows[0];
        return deletedVenue;
    } catch (error) {
        console.error('Error deleting venue:', error.message);
        throw error;
    }
};

exports.deleteOrganizingTeamMember = async (teamMemberId) => {
    try {

        const result = await pool.query('DELETE FROM public.organizingteam WHERE id = $1 RETURNING *', [teamMemberId]);
        const deletedTeamMember = result.rows[0];
        return deletedTeamMember;
    } catch (error) {
        console.error('Error deleting organizing team member:', error.message);
        throw error;
    }
};

exports.getSpeakers = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.speaker');
        const speakers = result.rows;
        return speakers;
    } catch (error) {
        console.error('Error fetching speakers:', error.message);
        throw error;
    }
};

exports.deleteSpeaker = async (speakerId) => {
    try {
        const result = await pool.query('DELETE FROM public.speaker WHERE id = $1 RETURNING *', [speakerId]);
        const deletedSpeaker = result.rows[0];
        return deletedSpeaker;
    } catch (error) {
        console.error('Error deleting speaker:', error.message);
        throw error;
    }
};





exports.getAllSponsors = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.sponsor');
        return result.rows;
    } catch (error) {
        console.error('Error getting sponsors:', error.message);
        throw error;
    }
};

exports.deleteSponsor = async (id) => {
    try {
        const result = await pool.query('DELETE FROM public.sponsor WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting sponsor:', error.message);
        throw error;
    }
};


exports.getStatistics = async () => {
    try{
        const eventStat =await pool.query('Select count(eventid) from event');
        const attendeeStat = await pool.query('Select count(id) from attendee');

        const agendaStat = await pool.query('Select count(sessionid) from agenda');
        const expensesStat = await pool.query('SELECT MAX(price*quantity) from Expenses where "expensesType" = false');
        const fundingStat = await pool.query('SELECT MAX(price*quantity) from Expenses where "expensesType" = true');

        let respoenBody = {
            events:eventStat.rows[0].count,
            attendee: attendeeStat.rows[0].count,
            agenda: agendaStat.rows[0].count,
            expenses: expensesStat.rows[0].max,
            funding: fundingStat.rows[0].max
        }
        return respoenBody;
        //another one for number of sessions

    }catch (e) {
        console.log(e);
        return -1;
    }
}

exports.getEventTable = async () => {
    try{
        const result=  await pool.query(`SELECT e.eventid, e.eventname, e.date, COALESCE(a.attendee_count, 0) AS attendee_count
        FROM event e
        LEFT JOIN (SELECT eventid, COUNT(*) AS attendee_count FROM attendee GROUP BY eventid) 
        a ON e.eventid = a.eventid;`);
        return result.rows;
    }catch (e) {
        console.log(e);
        return -1;
    }
}

exports.getOrganizersTable = async () => {
    try{
        const result=  await pool.query(`SELECT ot.id, ot.name AS team_name, COUNT(e.eventid) AS event_count
                                         FROM organizingteam ot
                                         LEFT JOIN event e ON ot.id = e.orgteamid
                                         GROUP BY ot.id, ot.name;`);
        return result.rows;
    }catch (e) {
        console.log(e);
        return -1;
    }
}