const eventsmodel = require('../models/events');

const bcrypt = require('bcryptjs')

exports.getEvents =async (req,res,next)=>{
    console.log("GET Events Request")

    try{
        let events = await eventsmodel.getAllEvents()
        if(events===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        const jsonResult =JSON.stringify(events);
        res.status(200).json(jsonResult);
    }catch (e) {
        console.log(e);
        res.status(500).json({message:'There is error in the Server'})
    }



}
exports.getEventsByID =async (req,res,next)=>{
    console.log("GET Events by ID")
    let id = req.params.id;
    console.log(id);
    try{
       let events= await eventsmodel.getEventsById(id);
        if(events===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        const jsonResult =JSON.stringify(events);
        res.status(200).json(jsonResult);
    }catch (e) {
        console.log(e);
        res.status(500).json({message:'There is error in the Server'})
    }


}

exports.getAgenda= async (req,res,nex)=>{
    let id = req.params.id;
    try{
        let agenda = await eventsmodel.getAgenda(id)
        if(agenda===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        const jsonResult =JSON.stringify(agenda);
        // console.log(jsonResult);
        res.status(200).json(jsonResult);
    }catch (e) {
        console.log(e);
        res.status(500).json({message:'There is error in the Server'})

    }

}

exports.addEvent=async (req,res,next)=>{
    let mangerId = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let date  =req.body.date;
    let sttime = req.body.sttime;
    let endtime=  req.body.endtime;
    console.log(req.body);
    try {
        let respoen = await eventsmodel.addEvent(mangerId, name, description, date, sttime, endtime);
        if(respoen===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.json({message: 'Event Has been added successfully'})

    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
  /*  console.log(req.body);
    console.log(id);
    console.log(name);
    console.log(description);*/
   // res.send("SEND!!");
}


exports.addEventVenue = async (req,res,next)=>{
    console.log("Add Event Venue");
    console.log(req.body);

    let venueid = req.body.venueid;
    let eventid = req.body.eventid;
    //let managerid = req.body.managerid;
    try {
        let respone = await eventsmodel.addEventVenue(eventid,venueid);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.json({message: 'Venue Has been set up successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
}



exports.addAgendaSession = async (req,res,next)=>{
    console.log("Add Agenda Session");
    console.log(req.body);
    const { eventid, sttime, duration, description, speakerid } = req.body;

    const eventData = {
        eventid,
        sttime,
        duration: Number(duration), // Assuming duration is a string and needs to be converted to a number
        description,
        speakerid: parseInt(speakerid),
    };
    // Check if the parsing was successful
    if (isNaN(eventData.duration) || isNaN(eventData.speakerid)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }
    try {
        let respone = await eventsmodel.addSession(eventData);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.json({message: 'Session Has been set up successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
}

exports.removeAgendaSession = async (req,res,next)=>{
    console.log("Remove Agenda Session");
    console.log(req.body);
    let {sessionId}= req.body;
    try {
        let respone = await eventsmodel.removeSession(sessionId);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.json({message: 'Session Has been deleted successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
}

exports.addExpenses = async (req,res,next)=>{
    console.log("Add expenses");
    console.log(req.body);
    const { eventID, itemName, quantity, price, description,type } = req.body;

    // Convert eventID, Quantity, and Price to numbers
    const parsedEventID = parseInt(eventID, 10);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);

    // Check if the parsing was successful
    if (isNaN(parsedEventID) || isNaN(parsedQuantity) || isNaN(parsedPrice)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }
    try{
        let respone = await eventsmodel.addExpenses(parsedEventID,itemName,parsedQuantity,parsedPrice,description,type);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.status(201).json({message:'Expenses has been added successfully'});
    }catch (e){
        res.status(500).json({message:'There is error in the Server'})
    }
}

exports.getExpensesId= async (req,res,next)=>{
    let eventId = req.params.id;
    console.log(`EventID: ${eventId}`);

    try{
        let respone =await eventsmodel.getExpensesId(eventId);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.status(200).json(JSON.stringify(respone));
    }catch (e){
        res.status(500).json({message:'There is error in the Server'})
    }
}

exports.deleteExpeneseId = async (req,res,next)=>{
    let {id}= req.body;
    console.log("Delete Expense");
    console.log(req.body)
    try {
        let respone = await eventsmodel.deleteExpenese(id);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.status(200).json({message: 'Expense Has been deleted successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }

}



exports.deleteEventId = async (req,res,next)=>{
    let {id}= req.body;
    console.log("Delete Event");
    console.log(req.body)
    try {
        let respone = await eventsmodel.deleteEvent(id);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.status(200).json({message: 'Event Has been deleted successfully'})
    }catch (e) {
        console.log(e);

        res.status(500).json({message:'There is error in the Server'})
    }

}


exports.getOrganizingTeam = async (req,res,next)=>{
    console.log("GET organizing Team");
    try{
        let respone = await eventsmodel.getOrganizingTeam();
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        let jsonRes = JSON.stringify(respone);
        res.status(200).json(jsonRes);

    }catch (e) {
        console.log(e);
        res.status(500).json({message:'There is error in the Server'})
    }
}

exports.addEventOrganizing = async (req,res,next)=>{
    console.log("Add Event Organizing");
    console.log(req.body);

    let orgTeamId = req.body.orgteamid;
    let eventId = req.body.eventid;
    try {
        let respone = await eventsmodel.addEventOrganizing(eventId,orgTeamId);
        if(respone===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        res.json({message: 'Organizing Team Has been set up successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
}

