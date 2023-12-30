const dashboardModel = require('../models/dashboard');

exports.addOrganizingTeam = async (req,res,next)=>{
    try {
        let { name, cost, rate, password} = req.body;
        console.log("ADD Organizing Team");
        console.log(req.body);
        // Ensure required fields are present
        if (!name || !cost || !rate || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        cost = parseFloat(cost);
        rate = parseInt(rate);
        let newTeam = await dashboardModel.addOrganizingTeam(name,cost,rate,password);
        res.status(201).json({message:'A new Organizing team added', team:newTeam});
    } catch (error) {
        console.error('Error inserting Offer:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.addVenue = async (req,res,next)=>{
    try {
        let { name,location,capacity,pricePerHour,rating} = req.body;
        console.log("ADD Venue");
        console.log(req.body);
        // Ensure required fields are present
        if (!name || !location || !capacity || !pricePerHour ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if(!rating){
            rating=1.0;
        }
        capacity = parseInt(capacity);
        pricePerHour = parseInt(pricePerHour);
        rating = parseFloat(rating);
        let newVenue = await dashboardModel.addVenue(name,location,capacity,pricePerHour,rating);
        res.status(201).json({message:'A new Venue added', venue:newVenue});
    } catch (error) {
        console.error('Error inserting Offer:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.addSpeaker = async (req, res, next) => {
    try {
        let { fname, lname, phone, email,password, regPassword } = req.body;

        console.log("Add Speaker");
        console.log(req.body);

        // Ensure required fields are present
        if (!fname || !lname || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Additional validation or data processing can be done here

        let newSpeaker = await dashboardModel.addSpeaker(fname, lname, phone, email,password,regPassword);
        res.status(201).json({ message: 'A new Speaker added', speaker: newSpeaker });
    } catch (error) {
        console.error('Error inserting Speaker:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.addSponsor = async (req, res, next) => {
    try {
        let { name, phone, email, password} = req.body;
        console.log("Add Sponsor");
        console.log(req.body);

        // Ensure required fields are present
        if (!name || !phone || !email) {
            console.log("Missing element");
            console.log(name,phone,email);
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Additional validation or data processing can be done here

        let newSponsor = await dashboardModel.addSponsor(name, phone, email,password);
        res.status(201).json({ message: 'A new Sponsor added', sponsor: newSponsor });
    } catch (error) {
        console.error('Error inserting Sponsor:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteVenue = async (req, res, next) => {
    try {
        const { id } = req.body; // Assuming the venue ID is provided as a URL parameter
        if(!id){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const deletedVenue = await dashboardModel.deleteVenue(id);

        if (!deletedVenue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        console.log(deletedVenue);
        res.status(200).json({ message: 'Venue deleted successfully', venue: deletedVenue });
    } catch (error) {
        console.error('Error in deleteVenue controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteOrganizingTeamMember = async (req, res, next) => {
    try {
        console.log("DELETE Organizer");
        const { id } = req.body; // Assuming the organizing team member ID is provided as a URL parameter

        if(!id){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const deletedTeamMember = await dashboardModel.deleteOrganizingTeamMember(id);
        console.log(deletedTeamMember);
        if (!deletedTeamMember) {
            return res.status(404).json({ error: 'Organizing team member not found' });
        }

        res.status(200).json({ message: 'Organizing team member deleted successfully', teamMember: deletedTeamMember });
    } catch (error) {
        console.error('Error in deleteOrganizingTeamMember controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getSpeakers = async (req, res) => {
    try {
        const speakers = await dashboardModel.getSpeakers();
        res.json({ speakers });
    } catch (error) {
        console.error('Error fetching speakers:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteSpeaker = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const deletedSpeaker = await dashboardModel.deleteSpeaker(id);

        if (!deletedSpeaker) {
            return res.status(404).json({ error: 'Speaker not found' });
        }

        res.status(200).json({ message: 'Speaker deleted successfully', speaker: deletedSpeaker });
    } catch (error) {
        console.error('Error deleting speaker:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getSponsors = async (req, res, next) => {
    try {
        const sponsors = await dashboardModel.getAllSponsors();
        res.status(200).json({ sponsors });
    } catch (error) {
        console.error('Error getting sponsors:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteSponsor = async (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const deletedSponsor = await dashboardModel.deleteSponsor(id);
        res.status(200).json({ message: 'Sponsor deleted successfully', sponsor: deletedSponsor });
    } catch (error) {
        console.error('Error deleting sponsor:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getStatistics = async (req,res,next)=>{
    try{
        const statistics = await dashboardModel.getStatistics();
        if(statistics===-1){
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({statistics});
    }catch (e) {
        console.error('Error getting Statistics:', e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getEventTable = async (req,res,next)=>{
    try{
        const eventTable = await dashboardModel.getEventTable();
        if(eventTable===-1){
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({eventTable});
    }catch (e) {
        console.error('Error getting Statistics:', e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getOrganizerTable = async (req,res,next)=>{
    try{
        const organizerTable = await dashboardModel.getOrganizersTable();
        if(organizerTable===-1){
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({organizerTable});
    }catch (e) {
        console.error('Error getting Statistics:', e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



