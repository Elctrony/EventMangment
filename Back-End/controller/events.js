const eventsmodel = require('../models/events');

const bcrypt = require('bcryptjs')

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

exports.addEventManger = async (req,res,next)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    try{
        let newid = await  eventsmodel.addEventManger(fname,lname,phone,email,password);
        res.json({
            'message': 'A new event Manger has been added',
            'id':newid
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }

}