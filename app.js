const express = require('express');
const pg = require("pg");
const bodyParser = require("body-parser");
const path = require('path');

var customers = require('./routes/customers'); 
var routes = require('./routes');
var app = express();
 
var connectionString = "postgres://postgres:root@localhost:5432/database";

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/json', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM student where id = $1', [1],function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});

app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.update);

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});