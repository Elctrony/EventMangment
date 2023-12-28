const sponsorsmodel = require('../models/sponsors');


exports.getAllSponsors = async (req,res,next)=>{


    try{
        let respone = await sponsorsmodel.getSponsors();
        if(respone===-1){
            res.status(500).json({'error':'There is a problem in the server'})
            return;
        }
        let result= JSON.stringify(respone);
        res.status(200).json(result);
    }catch (e) {
        console.log(e);
        res.status(500).json({'error':'There is a problem in the server'})
    }
}


exports.addSponsorOffer = async (req,res,next)=>{
    try {
        let { sponsorId, eventId, price, isVip} = req.body;
        console.log("ADD Sponsor Offer");
        console.log(req.body);
        // Ensure required fields are present
        if (!sponsorId || !eventId || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if(!isVip){
            isVip=0;
        }
        eventId = parseInt(eventId);
        price = parseFloat(price);
        let newAttendee = await sponsorsmodel.addSponsorOffer(sponsorId,eventId,price,isVip);
        res.status(201).json({message:'A new Offer added', offer:newAttendee});
    } catch (error) {
        console.error('Error inserting Offer:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getSponsorOffers = async (req,res,next)=>{
    try{
        let {id}= req.params;
        console.log("GET Sponsor Offers");
        console.log(req.body);
        if(!id){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        id = parseInt(id);

        let sponsors = await sponsorsmodel.getSponsorOffers(id);
        if(sponsors===-1){
            res.status(500).json({message:'There is error in the Server'})
            return;
        }
        const jsonResult =JSON.stringify(sponsors);
        res.status(200).json(jsonResult);
    } catch (error) {
        console.error('Error inserting Offer:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}