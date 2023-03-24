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
});

router.post('/pessoas/registo', function(req, res, next) {
    newPessoa={
        nome: req.body.nome,
        idade: req.body.idade,
        sexo: req.body.sexo,
        "morada.cidade": req.body.cidade,
        "morada.distrito": req.body.distrito,
        ...(req.body.BI) && {BI: req.body.BI},
        ...(req.body.CC) && {BI: req.body.CC},
        ...(req.body.descrição != "") && {descrição: req.body.descrição},
        profissao: req.body.profissao,
        partido_politico: {
            party_abbr: req.body.party_abbr,
            party_name: req.body.party_name
        },
        ...(req.body.religiao!="") && {religiao: req.body.religiao},
        desportos: req.body.desportos.split(/\r?\n|\r|\n/g),
        animais: req.body.animais.split(/\r?\n|\r|\n/g),
        figura_publica_pt: req.body.figura_publica_pt.split(/\r?\n|\r|\n/g),
        marca_carro: req.body.marca_carro,
        destinos_favoritos: req.body.destinos_favoritos.split(/\r?\n|\r|\n/g),
        atributos:{
            fumador: req.body.fumador,
            gosta_cinema: req.body.gosta_cinema,
            gosta_viajar: req.body.gosta_viajar,
            acorda_cedo: req.body.acorda_cedo,
            gosta_ler: req.body.gosta_ler,
            gosta_musica: req.body.gosta_musica,
            gosta_comer: req.body.gosta_comer,
            gosta_animais_estimacao: req.body.gosta_animais_estimacao,
            gosta_dancar: req.body.gosta_dancar,
            comida_favorita: req.body.comida_favorita,
        }
    }
    
    Pessoa.add(newPessoa)
        .then( pessoa =>{
            res.redirect('/pessoas/' + pessoa._id)
        })
        .catch( error => {
            res.render('error', { error: error });
        })
});

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
});

router.post('/pessoas/edit/:id', function(req, res, next) {
    newPessoa={
        nome: req.body.nome,
        idade: req.body.idade,
        sexo: req.body.sexo,
        "morada.cidade": req.body.cidade,
        "morada.distrito": req.body.distrito,
        ...(req.body.BI) && {BI: req.body.BI},
        ...(req.body.CC) && {BI: req.body.CC},
        ...(req.body.descrição != "") && {descrição: req.body.descrição},
        profissao: req.body.profissao,
        partido_politico: {
            party_abbr: req.body.party_abbr,
            party_name: req.body.party_name
        },
        ...(req.body.religiao!="") && {religiao: req.body.religiao},
        desportos: req.body.desportos.split(/\r?\n|\r|\n/g),
        animais: req.body.animais.split(/\r?\n|\r|\n/g),
        figura_publica_pt: req.body.figura_publica_pt.split(/\r?\n|\r|\n/g),
        marca_carro: req.body.marca_carro,
        destinos_favoritos: req.body.destinos_favoritos.split(/\r?\n|\r|\n/g),
        atributos:{
            fumador: req.body.fumador,
            gosta_cinema: req.body.gosta_cinema,
            gosta_viajar: req.body.gosta_viajar,
            acorda_cedo: req.body.acorda_cedo,
            gosta_ler: req.body.gosta_ler,
            gosta_musica: req.body.gosta_musica,
            gosta_comer: req.body.gosta_comer,
            gosta_animais_estimacao: req.body.gosta_animais_estimacao,
            gosta_dancar: req.body.gosta_dancar,
            comida_favorita: req.body.comida_favorita,
        }
    }
    Pessoa.edit(req.params.id, newPessoa)
        .then( pessoa =>{
            res.redirect('/pessoas/' + pessoa._id)
        })
        .catch( error => {
            res.render('error', { error: error });
        })
});

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
});

router.get('/pessoas/delete/:id', function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    Pessoa.get(req.params.id)
        .then( pessoa =>{
            res.render('deletePessoa', { p:pessoa, d:data });
        })
        .catch( error => {
            res.render('error', { error: error });
        })
});

router.post('/pessoas/delete/:id', function(req, res, next) {
    Pessoa.delete(req.params.id)
        .then( pessoa =>{
            res.redirect('/')
        })
        .catch( error => {
            res.render('error', { error: error });
        })
});

module.exports = router;
