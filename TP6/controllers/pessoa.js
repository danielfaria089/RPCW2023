var Pessoa = require("../models/pessoa")
var mongoose = require('mongoose')

module.exports.list = () => {
    return Pessoa.find().sort("nome")
        .then( pessoas =>{
            return pessoas
        })
        .catch( error => {
            return error
        })
}

//get
module.exports.get = (id) => {
    return Pessoa.findOne({_id: id}).lean()
        .then( pessoa =>{
            return pessoa
        })
        .catch( error => {
            return error
        })
}

//add
module.exports.add = (pessoa) => {
    console.dir(pessoa)
    var newPessoa = new Pessoa(pessoa)
    return newPessoa.save()
        .then( pessoa =>{
            return pessoa
        })
        .catch( error => {
            return error
        })
}

//edit
module.exports.edit = (id, pessoa) => {
    return Pessoa.updateOne({_id: id}, pessoa)
        .then( pessoa =>{
            return pessoa
        })
        .catch( error => {
            return error
        })
}

//delete
module.exports.delete = (id) => {
    return Pessoa.deleteOne({_id: id})
        .then( pessoa =>{
            return pessoa
        })
        .catch( error => {
            return error
        })
}