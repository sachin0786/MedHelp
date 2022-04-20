const mongoose = require('mongoose');
const Hospital = require('../models/hospitals');
const Data = require('./hospital');


//===========================connect mongoose with express========================================
mongoose.connect('mongodb://localhost:27017/DocHelp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongoose connect with express");
}).catch((err) => {
    console.log("Not connect with mmongoose");
    console.log(err);
});

//================================================================================================


const SeedDB = async () => {
    await Hospital.deleteMany({});

    for (let i = 0; i < 49; i++) {
              const hospital = new Hospital({
                name:Data[i].name,
                type:Data[i].type,
                bio:Data[i].bio,  
                location:{
                    state:Data[i].location.state,
                    city:Data[i].location.city,
                    pincode:Data[i].location.pincode,
                    address:Data[i].location.address
                },
                
                contact:{
                    email:Data[i].contact.email,
                    phone:Data[i].contact.phone,
                }
        });
        await hospital.save();
    }
}

SeedDB().then(() => {
    mongoose.connection.close();
});