const express=require('express');
const app=express();
const path=require('path');
var EJS  = require('ejs');



const mongoose=require('mongoose');
const methodOverride=require('method-override');

//import models
const Hospitals=require('./models/hospitals');
const Doctors=require('./models/doctors');
const Pharmas=require('./models/pharma');
const Labs=require('./models/labs');
const Bloodbanks=require('./models/blood');

//==========================set EJS============================================================
app.engine('html', EJS.renderFile);
app.set('view engine','ejs'); //help to set ejs
app.set('views',path.join(__dirname,'views')); //help to use ejs file, when we run our project from any directory
//=============================================================================================

//========================serving static files in public directory(CSS and JS)=============================
app.use(express.static('public')); 
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static('images'));

//========================Parse the body==================================================
app.use(express.urlencoded({extended:true}));

//=======================Method override help to use put,delete =========================
app.use(methodOverride('_method'));

//===========================connect mongoose with express========================================
mongoose.connect('mongodb://localhost:27017/DocHelp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Mongoose connect with express");
}).catch((err)=>{
    console.log("Not connect with mmongoose");
    console.log(err);
});
//================================================================================================

//===========================crud operation=====================================
app.get('/',(req,res)=>{
   res.send("Welcome to doc help");
})

//====================index page================================
app.get('/index',async(req,res)=>{
    const hospital=await Hospitals.find({});
    let toph=[];

    for(var i=0;i<10;i++)
    {
        const rand=Math.floor(Math.random()*10);
        toph.push(hospital[rand]);
    }

   
    res.render('Dochelp/LandingPage.ejs',{toph});
})

app.get('/blood',async(req,res)=>{
    const bloodbank=await Bloodbanks.find({});
    let toph=[];

    for(var i=0;i<10;i++)
    {
        const rand=Math.floor(Math.random()*10);
        toph.push(bloodbank[rand]);
    }

    res.render('Dochelp/Bloodpage.ejs',{toph})
})


//======================View Profile==============================
app.get('/viewhospital/:id',async (req,res)=>{
    const id=req.params.id;
    const hospital=await Hospitals.findById(id);
    // console.log(hospital);
    res.render('Dochelp/hospitalProfile.ejs',{hospital});
})

app.post('/viewhospital/:id',async (req,res)=>{
    const id=req.params.id;
    const hospital=await Hospitals.findById(id);
    const {name,comments,rating}=req.body;
    hospital.review.push({name,comments,rating});
    hospital.save();
    // console.log(hospital.review);
    res.render('Dochelp/hospitalProfile.ejs',{hospital});
})


app.get('/viewpharma/:id',async (req,res)=>{
    const id=req.params.id;
    const pharma=await Pharmas.findById(id);
    // console.log(pharma);
    res.render('Dochelp/pharmaProfile.ejs',{pharma});
})

app.post('/viewpharma/:id',async (req,res)=>{
    const id=req.params.id;
    const pharma=await Pharmas.findById(id);
    const {name,comments,rating}=req.body;
    pharma.review.push({name,comments,rating});
    pharma.save();
    // console.log(hospital.review);
    res.render('Dochelp/pharmaProfile.ejs',{pharma});
})

app.get('/viewlabs/:id',async (req,res)=>{
    const id=req.params.id;
    const lab=await Labs.findById(id);
    // console.log(lab);
    res.render('Dochelp/labProfile.ejs',{lab});
})

app.post('/viewlabs/:id',async (req,res)=>{
    const id=req.params.id;
    const lab=await Labs.findById(id);
    const {name,comments,rating}=req.body;
    lab.review.push({name,comments,rating});
    lab.save();
    // console.log(hospital.review);
    res.render('Dochelp/labProfile.ejs',{lab});
})

app.get('/viewbloods/:id',async (req,res)=>{
    const id=req.params.id;
    const bloodbank=await Bloodbanks.findById(id);
    // console.log(lab);
    res.render('Dochelp/bloodProfile.ejs',{bloodbank});
})

app.post('/viewbloodbank/:id',async (req,res)=>{
    const id=req.params.id;
    const bloodbank=await Bloodbanks.findById(id);
    const {name,comments,rating}=req.body;
    bloodbank.review.push({name,comments,rating});
    bloodbank.save();
    // console.log(hospital.review);
    res.render('Dochelp/bloodProfile.ejs',{bloodbank});
})

//===========================Search by city=======================
app.post('/search',async(req,res)=>{
    const city=req.body.city;
    console.log(city);
    const hospital=await Hospitals.find({"location.city":city});
    const pharma=await Pharmas.find({"location.city":city});
    const lab=await Labs.find({"location.city":city});
    const bloodbank=await Bloodbanks.find({"location.city":city});
    if(hospital.length==0)
    {
        res.redirect('/index');
    }

    // console.log(pharma);
    res.render('Dochelp/Search_Result.ejs',{hospital,pharma,lab,bloodbank});
})

app.listen(3000,()=>{
    console.log("Listen on port 3000");
})