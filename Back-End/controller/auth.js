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