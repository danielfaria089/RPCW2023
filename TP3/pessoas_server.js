// pessoas_server.js
// RPCW2023: 2023-02-27
// by jcr

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true)

    if(dicURL.pathname == "/" ){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(mypages.indexPage())
        res.end()
    }
    else if(dicURL.pathname == "/pessoas"){
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname.startsWith("/pessoas/")){
        user= dicURL.pathname.split("/")[2]
        axios.get("http://localhost:3000/pessoas/" + user)
            .then( function(resp){
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoaPage(pessoa))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/sexos"){
        dados={}
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                for(let i=0; i < pessoas.length ; i++){
                    if(pessoas[i].sexo in dados){
                        dados[pessoas[i].sexo] += 1
                    }
                    else{
                        dados[pessoas[i].sexo] = 1
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.sexosPage(dados))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname.startsWith("/sexos/")){
        sexo= dicURL.pathname.split("/")[2]
        axios.get("http://localhost:3000/pessoas?sexo=" + sexo + "&_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet.")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("Erro: Operação não suportada")
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")