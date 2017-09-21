/**
*
* Created by juan_arillo on 3/5/16. 
*
* Description: Tokens controller for API 
*
*/

  'use strict';

  // Loading express and router  

let express = require('express');
 let router = express.Router();

  // Loading Mongoose and Commercial´s model  

let mongoose = require('mongoose');
 let Token = mongoose.model('Token');

  // Loading errors handler library 

let errors = require('../../../lib/errorHandler');

  // Receiving and saving push  

router.post('/', function (req, res) { 
    let token = new Token(req.body); 
    token.save(function (err, saved) { 
        if(err){
            let error = new Error();
            error.message = 'token';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }  
        res.json({success: true, saved: saved}); 
     });
 });

router.put('/', function (req, res) {
    let token = new Token(req.body);
    token.save(function (err, saved) {
        if(err){
            let error = new Error();
            error.message = 'token';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }
        res.json({success: true, saved: saved});
    });
});

// Exporting the router 
module.exports = router;
