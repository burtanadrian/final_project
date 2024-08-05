//importa Node.js in built-in Module
const fs =require('fs');
//importa Express framework
const express = require('express');
//initializeaza o aplicatie in Express 
const app = express();
//specifica port-ul
const port=3000 ;
//importam rutele 
let userRoute = require("./userRoute");
let shiftRoute =require("./shiftRoute");
let commentRoute=require("./commentRoute");
//importam Mongoose-Object Data Modeling (ODM)librarie pt MongoDb si Node.js
let mongoose = require('mongoose');
//conectarea la MongoDb 
const uri = "mongodb+srv://ioanburtanadrian:BurtanAdrian@cluster0.wmyqtjv.mongodb.net/?retryWrites=true&w=majority";
//setari la optiuni pt conectarea cu MongoDb 1.use.. este folosit pt a evita semnalele de depreciere iar 2.dbName spec.numele bazei de date
var options = {useNewUrlParser:true, dbName:"ProjectNode"};
//conectarea la baza de date MongoDb
mongoose.connect(uri,options);
//monteaza manipulatoarele de rute importate anterior la caile specificate
app.use(express.json());
app.use("",userRoute);
app.use("",shiftRoute);
app.use("",commentRoute);
//folosim metoda listen() a obiectului app pt a porni serverul care asculta cererile primite de portul specificat("port")
app.listen(port,()=>{
    console.log (`App running on port ${port}.... `)
});