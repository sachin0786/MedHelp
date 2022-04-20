const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DoctorSchema=new Schema({
 name:String,
 type:String,
 specialization:String,
 image:String,
 location:{
     state:String,
     city:String,
     pincode:Number,
     address:String
 },
 contact:{
     email:String,
     phone:Number
 },
 review:{
     name:String,
    comments:String,
    rating:Number
 }
});

module.exports=mongoose.model('Doctor',DoctorSchema);