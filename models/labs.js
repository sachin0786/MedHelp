const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const LabsSchema=new Schema({
    name:String,
    image:String,
    location:{
        state:String,
        city:String,
        pincode:Number,
        address:String
    },
    
    phone:Number,
    
   
    review:[{
        name:String,
        comments:String,
        rating:Number
    }]
});


module.exports=mongoose.model('Labs',LabsSchema);