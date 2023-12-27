const venuemodel = require('../models/venues');
const {query} = require("express");

exports.getVenues = (req,res,next)=>{
    const  q=  req.query;
    console.log(q);
    let location = q.location
    let price =null;
    if(q.price){
         price =parseInt(q.price);
    }
    let rating=  null;
    if(q.rating){
        rating =  parseFloat(q.rating);
    }
    if (isNaN(rating) || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }
    venuemodel.getAllVenue({location,price,rating}).then((venues)=>{
        const jsonResult =JSON.stringify(venues);
        console.log("GET venues request");
        res.json(jsonResult);
    })

}

exports.getVenuesLocation= (req,res,next)=>{
    venuemodel.getVenusFilter().then((venues)=>{
        const jsonResult =JSON.stringify(venues);
        console.log("GET venues request");
        res.json(jsonResult);
    })
}
