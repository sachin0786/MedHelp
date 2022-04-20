const mongoose =require('mongoose');
const Schema=mongoose.Schema;


const BloodbankSchema=new Schema({
    name:String,
    image:String,
    location:{
        state:String,
        city:String,
        pincode:Number,
        address:String
    },
    
    contact:{
        email:String,
        phone:Number,
    },
    
    blood:[{
        type:String
    }],

    review:[{
        name:String,
        comments:String,
        rating:Number
    }]
});


module.exports=mongoose.model('Bloodbanks',BloodbankSchema);