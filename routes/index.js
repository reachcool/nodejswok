var express = require('express');
var router = express.Router();
var info = require('../database/db.js').info;
var w = require('../database/soap.js');
  /* GET home page. */
  router.get('/', function(req, res) {
        res.render('index', { title: 'index' });
  });

  /* login */
  router.get('/login', function(req, res) {
        res.render('login', { title: 'login' });
  });

  /* ucenter */
  router.post('/ucenter', function(req, res) {
              info.find(function(err, doc){
					res.render('ucenter',{
					title:'mongodb data infos',
					info:doc
					});
			
				console.log("info find results:",info.schema);
             });
  });

  /*wok search*/
  router.post('/wok', function(req, res) {
            //console.log(req);
            //console.log(res);
              w.soapwok(function(doc){
            //console.log(err);
            console.log(doc);
          res.render('wok',{
          title:'wok data infos',
          w:doc
          });
      
       // console.log("info find results:",wok);
             });
  });
module.exports = router;
