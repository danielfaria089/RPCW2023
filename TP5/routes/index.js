var express = require('express');
const axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/toDo')
        .then(response=>{
            toDo=response.data
            axios.get('http://localhost:3000/done')
                .then(response=>{
                    done=response.data
                    res.render('index', { toDo: toDo, done: done });
                })
                .catch(error=>{
                    console.log(error)
                    res.render('error', {error: error})
                })
        })
        .catch(error=>{
            console.log(error)
            res.render('error', {error: error})
        })
});

router.post('/add',function(req,res,next){
    axios.post('http://localhost:3000/toDo',{
        description: req.body.description,
        who: req.body.who,
        dateDue: req.body.dateDue
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(error=>{
        console.log(error)
        res.render('error', {error: error})
    })
})

router.post('/edit/:list',function(req,res,next){
    axios.put('http://localhost:3000/'+req.params.list+'/'+req.body.id,{
        description: req.body.description,
        who: req.body.who,
        dateDue: req.body.dateDue
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(error=>{
        console.log(error)
        res.render('error', {error: error})
    })
})

router.post('/delete/:list',function(req,res,next){
    axios.delete('http://localhost:3000/'+req.params.list+'/'+req.body.id)
    .then(()=>{
        res.redirect('/')
    })
    .catch(error=>{
        console.log(error)
        res.render('error', {error: error})
    })
})

router.post('/done',function(req,res,next){
    axios.get('http://localhost:3000/toDo/'+req.body.id)
    .then(response=>{
        axios.post('http://localhost:3000/done',{
            description: response.data.description,
            who: response.data.who,
            dateDue: response.data.dateDue
        })
        .then(()=>{
            axios.delete('http://localhost:3000/toDo/'+req.body.id)
            .then(()=>{
                res.redirect('/')
            })
            .catch(error=>{
                console.log(error)
                res.render('error', {error: error})
            })
        })
        .catch(error=>{
            console.log(error)
            res.render('error', {error: error})
        })
    })
    .catch(error=>{
        console.log(error)
        res.render('error', {error: error})
    })
})

router.post('/undone',function(req,res,next){
    axios.get('http://localhost:3000/done/'+req.body.id)
    .then(response=>{
        axios.post('http://localhost:3000/toDo',{
            description: response.data.description,
            who: response.data.who,
            dateDue: response.data.dateDue
        })
        .then(()=>{
            axios.delete('http://localhost:3000/done/'+req.body.id)
            .then(()=>{
                res.redirect('/')
            })
            .catch(error=>{
                console.log(error)
                res.render('error', {error: error})
            })
        })
        .catch(error=>{
            console.log(error)
            res.render('error', {error: error})
        })
    })
    .catch(error=>{
        console.log(error)
        res.render('error', {error: error})
    })
})

module.exports = router;
