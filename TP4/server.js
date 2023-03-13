var http = require('http')
var static = require('./static.js')
var templates = require('./templates.js')
var axios = require('axios')
const { parse } = require('querystring')


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var formServer = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                axios.get('http://localhost:3000/toDo')
                    .then(function (response) {
                        toDo = response.data
                        axios.get('http://localhost:3000/done')
                            .then(function (response) {
                                done = response.data
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write(templates.fullpage(toDo,done));
                                res.end();
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write("Error");
                                res.end();
                            });
                    })
                break;
            case "POST":
                if(req.url=="/add"){
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/toDo', {
                            description: result.description,
                            who: result.who,
                            dateDue: result.dateDue
                        })
                        .then(function (response) {
                            res.writeHead(302, {'Location': '/'});
                            res.end();
                        })
                        .catch(function (error) {
                            console.log(error);
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write("Error");
                            res.end();
                        });
                    })
                }
                else if(req.url=="/edit"){
                    collectRequestBodyData(req, result => {
                        axios.put('http://localhost:3000/toDo/'+result.id, {
                            description: result.description,
                            who: result.who,
                            dateDue: result.dateDue
                        })
                        .then(function (response) {
                            res.writeHead(302, {'Location': '/'});
                            res.end();
                        })
                        .catch(function (error) {
                            console.log(error);
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write("Error");
                            res.end();
                        });
                    })
                }
                else if(req.url=="/delete"){
                    collectRequestBodyData(req, result => {
                        axios.delete('http://localhost:3000/toDo/'+result.id)
                        .then(function (response) {
                            res.writeHead(302, {'Location': '/'});
                            res.end();
                        })
                        .catch(function (error) {
                            //Try to delete from done
                            axios.delete('http://localhost:3000/done/'+result.id)
                            .then(function (response) {
                                res.writeHead(302, {'Location': '/'});
                                res.end();
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write("Error");
                                res.end();
                            });
                        });
                    })
                }
                else if(req.url=="/done"){
                    collectRequestBodyData(req, result => {
                        axios.get('http://localhost:3000/toDo/'+result.id)
                        .then(function (response) {
                            axios.post('http://localhost:3000/done', {
                                description: response.data.description,
                                who: response.data.who,
                                dateDue: response.data.dateDue
                            })
                            .then(function (response) {
                                axios.delete('http://localhost:3000/toDo/'+result.id)
                                .then(function (response) {
                                    res.writeHead(302, {'Location': '/'});
                                    res.end();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.write("Error");
                                    res.end();
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write("Error");
                                res.end();
                            });
                        })
                        .catch(function (error) {	
                            console.log(error);
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write("Error");
                            res.end();
                        });
                    })
                }
                else if(req.url=="/undone"){
                    collectRequestBodyData(req, result => {
                        axios.get('http://localhost:3000/done/'+result.id)
                        .then(function (response) {
                            axios.post('http://localhost:3000/toDo', {
                                description: response.data.description,
                                who: response.data.who,
                                dateDue: response.data.dateDue
                            })
                            .then(function (response) {
                                axios.delete('http://localhost:3000/done/'+result.id)
                                .then(function (response) {
                                    res.writeHead(302, {'Location': '/'});
                                    res.end();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.write("Error");
                                    res.end();
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write("Error");
                                res.end();
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write("Error");
                            res.end();
                        });
                    })
                }
                break;

        }
    }
})

formServer.listen(7777)