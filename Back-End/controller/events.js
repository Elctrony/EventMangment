const eventsmodel = require('../models/events');

exports.getEvents = (req,res,next)=>{
    eventsmodel.getAllEvents().then((events)=>{
        const jsonResult =JSON.stringify(events);
        console.log("GET event request");
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

exports.addEvent=(req,res,next)=>{
    let id = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let date  =req.body.date;
    let sttime = req.body.sttime;
    let endtime=  req.body.endtime;

  /*  console.log(req.body);
    console.log(id);
    console.log(name);
    console.log(description);*/
    res.send("SEND!!");
}