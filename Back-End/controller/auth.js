const authmodel = require("../models/auth");


exports.addEventManager = async (req,res,next)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    try{
        let newid = await  authmodel.addEventManager(fname,lname,phone,email,password);
        res.json({
            'message': 'A new event Manger has been added',
            'id':newid
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }

}

exports.getEventManager = async (req,res,next)=>{
    let email = req.body.email;
    let password =req.body.password;

    try{
        let respone = await  authmodel.getEventManager(email);
        if(!respone){
            res.status(404).json({

                'code':0,
                'message':'This email is not found'
            })
            return;
        }
        if(respone.password != password){
            res.status(400).json({
                'code':1,
                'message':'Password is wrong'
            })
            return;
        }
        res.json({
            'message': 'Email has been found',
            'code':2,
            'user':respone
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }

}

exports.getOrganizing = async(req,res,next)=>{
    console.log("GET organizing");
    console.log(req.body);
    let id = parseInt(req.body.id);
    let password = req.body.password;

    try{
        let respone = await  authmodel.getOrganizing(id);
        if(!respone){
            res.status(404).json({

                'code':0,
                'message':'This Organizing team is not found'
            })
            return;
        }
        if(respone.password != password){
            res.status(400).json({
                'code':1,
                'message':'Password is wrong'
            })
            return;
        }
        res.json({
            'message': 'Organizing team has been found',
            'code':2,
            'user':respone
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }
}



exports.getSponsor = async(req,res,next)=>{
    console.log("GET Sponsor");
    console.log(req.body);
    let id = parseInt(req.body.id);
    let password = req.body.password;

    try{
        let respone = await  authmodel.getSponsor(id);
        if(!respone){
            res.status(404).json({

                'code':0,
                'message':'This Sponsor is not found'
            })
            return;
        }
        if(respone.password != password){
            res.status(400).json({
                'code':1,
                'message':'Password is wrong'
            })
            return;
        }
        res.json({
            'message': 'Sponsor has been found',
            'code':2,
            'user':respone
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }
}

exports.getSpeaker = async (req,res,next)=>{
    console.log("GET Sponsor");
    console.log(req.body);
    let id = parseInt(req.body.id);
    let password = req.body.password;

    try{
        let respone = await  authmodel.getSpeaker(id);
        if(!respone){
            res.status(404).json({

                'code':0,
                'message':'This Sponsor is not found'
            })
            return;
        }
        if(respone.password != password){
            res.status(400).json({
                'code':1,
                'message':'Password is wrong'
            })
            return;
        }
        res.json({
            'message': 'Sponsor has been found',
            'code':2,
            'user':respone
        });
    }catch (e){
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }
}
