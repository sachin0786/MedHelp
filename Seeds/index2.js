const mongoose = require('mongoose');
const Labs = require('../models/labs');
const Data = require('./labs');


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
    await Labs.deleteMany({});

    for (let i = 0; i < 48; i++) {
              const lab = new Labs({
                name:Data[i].name,
             
                location:{
                    state:Data[i].location.state,
                    city:Data[i].location.city,
                    pincode:Data[i].location.pincode,
                    address:Data[i].location.address
                },
                
                
                phone:Data[i].phone,
                
        });
        await lab.save();
    }
}

SeedDB().then(() => {
    mongoose.connection.close();
});