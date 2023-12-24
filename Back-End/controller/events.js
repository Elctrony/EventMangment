const eventsmodel = require('../models/events');

const bcrypt = require('bcryptjs')

exports.getEvents = (req,res,next)=>{
    eventsmodel.getAllEvents().then((events)=>{
        const jsonResult =JSON.stringify(events);
        console.log("GET event request");
        res.json(jsonResult);
    })

}
exports.getEventsByID =(req,res,next)=>{
    let id = req.params.id;
    console.log(id);
    eventsmodel.getEventsById(id).then((events)=>{
        const jsonResult =JSON.stringify(events);
        console.log("GET event by ID request");
        res.json(jsonResult);
    })

}

exports.getAgenda= (req,res,nex)=>{
    let id = req.params.id;
    eventsmodel.getAgenda(id).then((agenda)=>{
        const jsonResult =JSON.stringify(agenda);
       // console.log(jsonResult);
        res.json(jsonResult);
    })
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
        let respoen = await eventsmodel.addEventVenue(eventid,venueid);

        res.json({message: 'Venue Has been set up successfully'})
    }catch (e) {
        res.status(500).json({message:'There is error in the Server'})
    }
}
