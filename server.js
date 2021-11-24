const express = require('express');
const bodyParser = require('body-parser');
var util = require('util');
var encoder = new util.TextDecoder('utf-8');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const app = express();

const uri = "mongodb+srv://FelipeHoff:Luiza2312@teste.2628f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    console.log("Conectado ao banco de dados");

    const bd = client.db('cinema');
    const colecaoSalas = bd.collection('salas');


    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  
    app.use(bodyParser.urlencoded({ extended: true}))
    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
      colecaoSalas.find().toArray()
        .then(result => {
          console.log(result);
          res.render('salas.ejs', {salas: result});
        })
        .catch(error => console.error(error));
      
    })
    app.get('/sala1/:id', function(req, res) {
      colecaoSalas.find({"_id":ObjectId(req.params.id)}).toArray()
        .then(result => {
          console.log(result);
          res.render('sala1.ejs', {sala: result[0]});
        })
        .catch(error => console.error(error));
      
    })

    app.post('/salas', (req, res) => {
      var sala = req.body
      var quant = parseInt(sala.quantidade)
      sala.quantidade = quant
      sala.cadeiras = []
      for(i = 0; i < quant; i++){
        var cadeira = {
          id : ''+i,
          vendida : false,
        }
        sala.cadeiras.push(cadeira);
      }
      colecaoSalas.insertOne(sala)
        .then(result => {
          console.log(result);
          res.redirect('/');
        })
        .catch(error => console.error(error))
  })
})