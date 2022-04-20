const mongoose = require('mongoose');
const Pharma = require('../models/pharma');
const Data = require('./pharma');


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
    await Pharma.deleteMany({});

    for (let i = 0; i < 48; i++) {
              const pharma = new Pharma({
                name:Data[i].name,
             
                location:{
                    state:Data[i].location.state,
                    city:Data[i].location.city,
                    pincode:Data[i].location.pincode,
                    address:Data[i].location.address
                },
                
                contact:{
                    phone:Data[i].contact.phone,
                }
        });
        await pharma.save();
    }
}

SeedDB().then(() => {
    mongoose.connection.close();
});