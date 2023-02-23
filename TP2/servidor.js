var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    //Read url string
    var url = req.url;

    console.log("Acedeu a:", url);

    if(url == '/'){
        //Placeholder para index.html
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile('index.html',function(err,data){
            if(err){
                res.writeHead(404,{"Content-Type":"text/html"});
            }
            else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(data);
            }
            res.end();
        });
    }
    else{
        var numpage = url.split('/')[1];
        if(!isNaN(numpage)){
            fs.readFile('arqs/arq'+numpage+'.xml',function(err,data){
                if(err){
                    res.writeHead(404,{"Content-Type":"text/xml"});
                }
                else{
                    res.writeHead(200,{"Content-Type":"text/xml"});
                    res.write(data);
                }
                res.end();
            });
        }
    }
}).listen(7777);