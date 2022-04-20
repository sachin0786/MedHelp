const mongoose = require('mongoose');
const Bloodbanks = require('../models/blood');
const Data = require('./blood');


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
    await Bloodbanks.deleteMany({});

    for (let i = 0; i < 53; i++) {
              const Bloodbank = new Bloodbanks({
                name:Data[i].name,
             
                location:{
                    state:Data[i].location.state,
                    city:Data[i].location.city,
                    pincode:Data[i].location.pincode,
                    address:Data[i].location.address
                },
                
                contact:{
                    phone:Data[i].contact.phone,
                    email:Data[i].contact.email
                },

                blood:Data[i].blood
                
                
        });
        await Bloodbank.save();
    }
}

SeedDB().then(() => {
    mongoose.connection.close();
});