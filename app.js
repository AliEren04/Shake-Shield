const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyparser = require('body-parser'); 
const cors = require('cors'); 
const path = require('path');
const public = path.join(__dirname, 'public');
const app = express(); 
const cheerio = require('cheerio');
const fetch = require('fetch');
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


mongoose.connect("YOUR MONGO  URI", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


var NotEmptyString = {type: String, minLength: 1};

var Schema = mongoose.Schema; 


var helpSchema = new Schema({
    name: NotEmptyString,
    surname: NotEmptyString, 
    helpmessage: NotEmptyString,
    helpaddress: NotEmptyString
})

var Help = mongoose.model('Help',helpSchema);


var helperSchema = new Schema({
    name: NotEmptyString,
    surname: NotEmptyString,
    helpprovided: NotEmptyString, 
    helperaddress: NotEmptyString 
})

var Helper = mongoose.model('Helper', helperSchema);

app.get('/', (req,res) => {
    res.sendFile(path.join(public, 'index.html'));
}); 

app.get('/askhelp' , (req,res) => {
  res.sendFile(path.join(public, 'askhelp.html'));
})


app.get('/helpsasked', async (req,res) => {
    try{
      const helpsAsked =  await Help.find();
      res.json(helpsAsked);
    }catch(err){
        res.jon({message:err}); 
    }
});


app.post('/shieldhelp', (req,res,next) => {
        

        const newHelp = {
            "name": req.body.name,
            "surname": req.body.surname,
            "helpmessage": req.body.helpmessage,
            "helpaddress": req.body.helpaddress
        }

        Help.create(newHelp, function(error, user) {
            if (error) {
              return next(error);
            } else {
              return res.redirect('/');
            }
          });
})

app.post('/shieldhelper' ,(req,res,next) => {
    
      const newHelper = {
        "name": req.body.name, 
        "surname": req.body.surname,
        "helpprovided": req.body.helpprovided,
        "helperaddress": req.body.helperaddress
      } 

      Helper.create(newHelper, function(error, user) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/');
        }
      });
      
})

app.get('/helpers', async (req,res) => {
  try{
    const helpGiven =  await Helper.find();
    res.json(helpGiven);
  }catch(err){
      res.jon({message:err}); 
  }
})


app.get('/providehelp' , (req,res) => {
  res.sendFile(path.join(public, 'providehelp.html'));
})

app.get('/supporters' , (req,res) => {
  res.sendFile(path.join(public, 'supporters.html'));
})

app.get('/earthquakes' , (req,res) => {
  res.sendFile(path.join(public, 'earthquakes.html'));
})



app.listen(3000);