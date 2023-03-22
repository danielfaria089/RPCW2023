var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    Pessoa.list()
        .then( pessoas =>{
            res.render('index', { plist:pessoas, d:data });
        })
        .catch( error => {
            res.render('error', { error: error });
        })
});

/*Registo de pessoas*/
router.get('/pessoas/registo', function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    res.render('addPessoa', { d:data });
})

/*Edição de registo*/
router.get('/pessoas/edit/:id', function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    Pessoa.get(req.params.id)
        .then( pessoa =>{
            res.render('editPessoa', { p:pessoa, d:data });
        })
        .catch( error => {
            res.render('error', { error: error });
        })
})

/*Detalhes de uma pessoa*/
router.get('/pessoas/:id', function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    Pessoa.get(req.params.id)
        .then( pessoa =>{
            res.render('person', { p:pessoa, d:data });
        })
        .catch( error => {
            res.render('error', { error: error });
        })
})

module.exports = router;
