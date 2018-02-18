var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://smfc:cewit%401500!@ds239368.mlab.com:39368/phrases')

var Schema = new mongoose.Schema({
    Name: String
});

var Hashed = mongoose.model("hashes", Schema);

app.get('/view', (req, res)=>{
    Hashed.find({}, function(err, data){
        if(err) throw err;
        if(!err){

        }
        if(data){
            console.log(data.length);
            res.render("view", {data: data});
        }
    });
});

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/', (req, res)=>{
    console.log(req.body.name);

    var newHashed = new Hashed({
        Name: req.body.name
    });

    newHashed.save(function(err){

    });

    console.log(newHashed);
    res.send("Data has been stored!");
});




app.listen('3003');
