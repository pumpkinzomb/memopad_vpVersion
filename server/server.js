// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import session from 'exrpess-session';
// import api from './routes';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;



const mongodbUri = 'mongodb+srv://zomb:asdf1@memopad.yefxf.mongodb.net/memopad?retryWrites=true&w=majority';
mongoose.connect(mongodbUri, {
  useNewUrlParser: true
});

var conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'Connection error: '));  
 
conn.once('open', () =>{
 console.log('Connected to a database')                       
});

router.use('/*', (req, res, next) => {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

routes(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '!@#$Sign$#%#!',
    resave:false,
    saveUninitialized: true
}));

app.use('/api',router);
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/../build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));