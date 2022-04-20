const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const PharmaSchema=new Schema({
    name:String,
    image:String,
    location:{
        state:String,
        city:String,
        pincode:Number,
        address:String
    },
    contact:{
        phone:Number
    },
   
    review:[{
        comments:String,
        rating:Number
    }]
});


module.exports=mongoose.model('Pharma',PharmaSchema);