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

module.exports = router;
