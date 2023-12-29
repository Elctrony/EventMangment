const pool = require("../db");


exports.addOrganizingTeam =async (name,cost,rate,password)=>{
    try{
        const result = await pool.query(
            'INSERT INTO public.organizingteam(name, hiringcost, rate, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, cost, rate, password]
        );
        console.log(result);
        const newTeam = result.rows[0];
        console.log(newTeam)
        return newTeam;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addVenue =async (name,location,capacity,price,rating)=>{
    try{
        const result = await pool.query(
            'INSERT INTO public.venue(name, location, capacity, priceperhour, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, location, capacity, price, rating]
        );
        console.log(result);
        const newTeam = result.rows[0];
        console.log(newTeam)
        return newTeam;
    }catch (e){
        console.log(e);
        return -1;
    }
}

exports.addSpeaker = async (fname, lname, phone, email,password,regPassword) => {
    try {
        const result = await pool.query(
            'INSERT INTO public.speaker(fname, lname, phone, email,password, "regPassword") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [fname, lname, phone, email,password,regPassword]
        );
        console.log(result);
        const newSpeaker = result.rows[0];
        console.log(newSpeaker);
        return newSpeaker;
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
