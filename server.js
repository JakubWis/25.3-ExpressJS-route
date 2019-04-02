var express = require('express');
var fs = require('fs');

var app = express();
var stringifyFile;
app.use(require('body-parser').json());

app.get('/getNote', function(req,res){
    fs.readFile('./file.json', 'utf8', function(err, data){
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    })
});

app.post('/updateNote/:note', function(req, res){
    stringifyFile += req.params.note;
    fs.writeFile('./file.json', stringifyFile, function(err, data){
        if (err) throw err;
        console.log('file update');
    });
});



app.get('/', function(req,res){
    console.log('Otrzymałem żądanie GET do strony głównej');
    res.send('Hello GET!');
});

/* variable inside url
app.get('/:id' , function(req,res){
    console.log('Otrzymałem żądanie GET do strony głównej');
    res.send('Identyfikator, który został dopisany to ' + req.params.id);
});
*/

app.post('/', function(req, res){
    console.log('Otrzymałem żądanie POST do strony głównej');
    res.send('Hello SEND!')
});

app.delete('/del_user', function(req, res) {
    console.log('Otrzymałem żądanie DELETE do strony /del_user');
    res.send('Hello DELETE!');
});

app.get('/list_user', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /list_user');
    res.send('Strona z listą użytkowników!');
});

app.get('/ab*cd', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /ab*cd');
    res.send('Wzór pasuje');
});

/*
app.use(function(req, res, next){
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});
*/

var server = app.listen(3000)