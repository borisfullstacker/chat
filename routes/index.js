var express = require('express');
var router = express.Router();
var controller= require('../modules/userControlelr')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/chat.html');
});


router.post('/msg', function (req,res){
 var con=controller.connectTo()
  controller.add(con,req.body,res,"messages")
});


router.get('/start', function (req,res){
  var con=controller.connectTo()
  //sending table name
  controller.get(con,req.query,res,"messages")
  // var con=controller.connectTo()
  //  controller.add(con,req.body,res)
 });





module.exports = router;
