const { map } = require("lodash")

exports.pessoasPage = function(lista){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Listagem de Pessoas</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `
    for(let i=0; i < lista.length ; i++){
        pagHTML += `
                <tr onclick="window.location.href='/pessoas/${lista[i].id}';">
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.indexPage = function(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Página Inicial</title>
        </head>
        <body>
            <div class="w3-container w3-center">
                <h1>Página inicial</h1>
                <button onclick="window.location.href='/pessoas';" class="w3-teal w3-button">Listagem de pessoas</button>
                <button onclick="window.location.href='/sexos';" class="w3-teal w3-button">Distribuição por sexo</button>
                <button onclick="window.location.href='/desportos';" class="w3-teal w3-button">Distribuição por desporto</button>
                <button onclick="window.location.href='/profissoes';" class="w3-teal w3-button">Top 10 profissões</button>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.pessoaPage = function(pessoa){
    atributos = []
    for (let key in pessoa.atributos){
        if(pessoa.atributos[key] == true){
            atributos.push(key.replace("gosta_","gosta de ").replace("_", " "))
        }
    }
    if (pessoa.sexo== "masculino"){
        header='<header class="w3-container w3-blue">'
    }
    else if(pessoa.sexo== "feminino"){
        header='<header class="w3-container w3-pink">'
    }
    else{
        header='<header class="w3-container w3-teal">'
    }
    var pagHTML=`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>${pessoa.id}</title>
        </head>
        <body>
            ${header}
                <h1>${pessoa.nome}</h1>
            </header>
            <div class="w3-container">
                <p>Idade: ${pessoa.idade}</p>
                <p>Sexo: ${pessoa.sexo}</p>
                <p>Morada: ${pessoa.morada.cidade}, ${pessoa.morada.distrito}</p>
                <p>BI: ${pessoa.BI}</p>
                <p>Profissão: ${pessoa.profissao}</p>
                <p>Partido político: ${pessoa.partido_politico.party_name}</p>
                <p>Religião: ${pessoa.religiao}</p>
                <p>Desportos: 
                    ${pessoa.desportos.map(desporto =>{
                        return desporto + "<br/>"
                    }).join("")}
                </p>
                <p>Animais:
                    ${pessoa.animais.map(animal =>{
                        return animal + "<br/>"
                    }).join("")}
                </p>
                <p>Figuras públicas:
                    ${pessoa.figura_publica_pt.map(figura =>{
                        return figura + "<br/>"
                    }).join("")}
                </p>
                <p>Marca de carro: ${pessoa.marca_carro}</p>
                <p>Destinos Favoritos:
                    ${pessoa.destinos_favoritos.map(destino =>{
                        return destino + "<br/>"
                    }).join("")}
                </p>
                <p>Atributos:
                    ${atributos.map(atributo =>{
                        return atributo + "<br/>"
                    }).join("")}
                </p>
            </div>
        </body>
    </html>
    `
    return pagHTML
}
    
exports.sexosPage = function(sexos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Distribuição por sexo</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Distribuição por sexo</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th><th>Quantidade</th>
                        </tr>
                `
    for(let key in sexos){
        pagHTML += `
                <tr onclick="window.location.href='/sexos/${key}';">
                    <td>${key}</td><td>${sexos[key]}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
        </body>
    </html>
    `
    return pagHTML
}

exports.desportosPage = function(desportos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Distribuição por desporto</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Distribuição por desporto</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th><th>Quantidade</th>
                        </tr>
                `
    for(let i=0; i<desportos.length; i++){
        desporto = desportos[i][0]
        quantidade = desportos[i][1]
        pagHTML += `
                <tr onclick="window.location.href='/desportos/${desporto}';">
                    <td>${desporto}</td><td>${quantidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
        </body>
    </html>
    `
    return pagHTML
}

exports.profissoesPage = function(profissoes){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Top10 de profissões</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Top10 de profissões</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Profissões</th><th>Quantidade</th>
                        </tr>
                `
    for(let i=0; i<profissoes.length; i++){
        var profissao = profissoes[i][0]
        var quantidade = profissoes[i][1]
        pagHTML += `
                <tr onclick="window.location.href='/profissoes/${profissao}';">
                    <td>${profissao}</td><td>${quantidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
        </body>
    </html>
    `
    return pagHTML
}