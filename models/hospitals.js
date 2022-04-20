const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const Doctor=require('./doctors');

const HospitalSchema=new Schema({
    name:String,
    type:String, //Govt/pvt
    bio:String,
    image:String,
    location:{
        state:String,
        city:String,
        pincode:Number,
        address:String
    },
    
    specialization:[{
        type:String
    }],
    doctors:[
        {
            type:Schema.Types.ObjectId,
            ref:'Doctor'
        }
    ],
    contact:{
        email:String,
        phone:Number,
    },
    
    review:[{
        name:String,
        comments:String,
        rating:Number
    }]
});


module.exports=mongoose.model('Hospital',HospitalSchema);