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
        var user = dicURL.pathname.split("/")[2]
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
        var dados = {}
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
        var sexo = dicURL.pathname.split("/")[2]
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
    else if(dicURL.pathname == "/desportos"){
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                var dados = {}
                for(let i=0; i < pessoas.length ; i++){
                    for (let j=0; j < pessoas[i].desportos.length; j++){
                        desporto=pessoas[i].desportos[j]
                        if(desporto in dados){
                            dados[desporto] += 1
                        }
                        else{
                            dados[desporto] = 1
                        }
                    }
                }
                //Sort the dictionary into a list
                var items = Object.keys(dados).map(function(key) {
                    return [key, dados[key]];
                });
                items.sort(function(first, second) {
                    return second[1] - first[1];
                });
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.desportosPage(items))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname.startsWith("/desportos/")){
        var sport = dicURL.pathname.split("/")[2]
        var desporto = decodeURI(sport)
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc").
            then( function(resp){
                var pessoas = resp.data
                var dados = []
                for(let i=0; i < pessoas.length ; i++){
                    for (let j=0; j < pessoas[i].desportos.length; j++){
                        if(pessoas[i].desportos[j] == desporto){
                            dados.push(pessoas[i])
                            break
                        }
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(dados))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            });
    }
    else if(dicURL.pathname == "/profissoes"){
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                var dados={}
                for(let i=0; i < pessoas.length ; i++){
                    if(pessoas[i].profissao in dados){
                        dados[pessoas[i].profissao] += 1
                    }
                    else{
                        dados[pessoas[i].profissao] = 1
                    }
                }
                //Sort the dictionary into a list
                var items = Object.keys(dados).map(function(key) {
                    return [key, dados[key]];
                });
                items.sort(function(first, second) {
                    return second[1] - first[1];
                });

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.profissoesPage(items.slice(0,10)))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname.startsWith("/profissoes/")){
        var prof= dicURL.pathname.split("/")[2]
        var profissao=decodeURI(prof)
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc").
            then( function(resp){
                var pessoas = resp.data
                var dados = []
                for(let i=0; i < pessoas.length ; i++){
                    if(pessoas[i].profissao == profissao){
                        dados.push(pessoas[i])
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(dados))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            });
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