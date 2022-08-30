// Imports 
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const { json } = require("express");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prabhuabhi02@gmail.com',
    pass: 'mzhlrojvlrsiciqg'
  }
});


const PORT = process.env.PORT;


dotenv.config({path: './config.env'});
require("./db/conn");
const User = require('./models/userschema');
const Company = require('./models/companyschema');
const Tripdet = require('./models/offerdata');
const Codet = require('./models/cupload');


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// static file
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname +'public/js'))
app.use('/images',express.static(__dirname + 'public/images'))



app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

//registration check 
app.post("/userschema",async (req,res) => {
    try {
        const userschema = new User({
            username: req.body.username,
            email: req.body.email,
            password:  req.body.password
        })
        const users = await userschema.save();
        res.status(201).render("index");
        
    } catch (error) {
        res.status(400).send(error);
    }
});

//login check
app.post("/login",async(req,res) =>{
    try {
        const username = req.body.username;
        const password = req.body.password;

       const usernm = await User.findOne({username:username});
       if(usernm.password === password){
           res.status(201).render("index1");
       }else{
           res.send("Incorrect Password or username")
       }
        
    } catch (error) {
        res.status(400).send("Invalid username or password")
        
    }
});

//company check
app.post("/companyschema",async (req,res) => {
    try {
        
        const companyschema = new Company({
            username: req.body.username,
            email: req.body.email,
            pass:  req.body.pass,
            address: req.body.address,
            city: req.body.city,
           

        })
        const company = await companyschema.save();
        res.status(201).render("buisness");
        
    } catch (error) {
        res.status(400).send(error);
    }
});

//comp login check
app.post("/comlogin",async(req,res) =>{
    try {
        const username = req.body.username;
        const pass = req.body.pass;

       const usernam = await Company.findOne({username:username});
       if(usernam.pass === pass){
           res.status(201).render("company");
       }else{
           res.send("Incorrect Password or username")
       }
        
    } catch (error) {
        res.status(400).send(error);
        
    }
});

//company trip upload
app.post("/cupload",async (req,res) => {
    try {
        
        const cupload = new Codet({
            from: req.body.from,
            to: req.body.to,
            noday:  req.body.noday,
            nonight: req.body.nonight,
            price: req.body.price,
           

        })
        const codet = await cupload.save();
        res.status(201).render("company");
        
    } catch (error) {
        res.status(400).send(error);
    }
});


//User trip details
app.post("/offerdata",async (req,res) => {
    try {
        const offerdata = new Tripdet({
            nadult: req.body.nadult,
            nchild: req.body.nchild,
            nmobile:  req.body.nmobile,
            nemail: req.body.nemail,
            nam: req.body.nam
            
        })
        var mailOptions = {
            from: 'prabhuabhi02@gmail.com',
            to: 'ashishbalti4@gmail.com, prabhuabhishek485@gmail.com, abhishekprabhu@ternaengg.ac.in',
            subject: 'Sending Email using Node.js',
            text: `Hi ` + req.body.nam + ` has selected your package tour , we have sent you the user details and contact information below..
            NO of adult: `+req.body.nadult + `
            No of child: ` +req.body.nchild + `
            Email: ` +req.body.nemail + `
            Mobile no: ` +req.body.nmobile
            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        const tripdets = await offerdata.save();
        res.status(201).render("index1");
        
    } catch (error) {
        res.status(400).send(error);
    }
});




//get method files 

app.get("/login",(req,res) =>{
    res.render("index");
});


app.get("/home", (req,res) => {
    res.render("index");
});

app.get("/comptours", (req,res) => {
    res.render("page");
});

app.get("/seller", (req,res) => {
    res.render("buisness");
});

app.get("/main", (req,res) =>{
    res.render("index1");

});

app.get("/comppackage", (req,res) =>{
    res.render("company");

});

app.get("/demo",(req,res) =>{
    res.render("Swizpage")
});

app.get("/enq",(req,res) =>{
    res.render("Enquiry")
});

app.get("/db",(req,res)=>{
    res.render("Dubai")
});

app.get("/ln",(req,res)=>{
    res.render("Lon")
});

app.get("/md",(req,res)=>{
    res.render("Mald")
});

app.get("/hm",(req,res) =>{
    res.render("Him")
})

// Listen on port 5500
app.listen(5500, () => {
    console.info('Listening on port at 5500');
})