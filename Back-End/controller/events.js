const eventsmodel = require('../models/events');

exports.getEvents = (req,res,next)=>{
    eventsmodel.getAllEvents().then((events)=>{
        const jsonResult =JSON.stringify(events);
        console.log(jsonResult);
        res.json(jsonResult);
    })
}

exports.getAgenda= (req,res,nex)=>{
    let id = req.params.id;
    eventsmodel.getAgenda(id).then((agenda)=>{
        const jsonResult =JSON.stringify(agenda);
        console.log(jsonResult);
        res.json(jsonResult);
    })
}