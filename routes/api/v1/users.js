/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Users controller for API
 *
 * Version: v1
 */

'use strict';

// Loading auth library
let jwt = require('jsonwebtoken');
let config = require('../../../lib/local_config');

// Loading sha256 library
let sha = require('sha256');

// Loading express and router

let express = require('express');
let router = express.Router();

// Loading Mongoose and user´s model

let mongoose = require('mongoose');
let User = mongoose.model('User');

// Loading error handler library
let errors = require('../../../lib/errorHandler');

// Adding and saving user´s instance
router.post('/', function (req, res, next) {
    let user = new User(req.body);

    // sha256 encoding
    if (!user.key){
        let error = new Error();
        error.message = 'key';
        error.language = req.lang;
        error.status = 500;
        errors(error, res);
        return;
    }
    let shaPass = sha(user.key);
    user.key = shaPass;

    // Controlling fields validation
    try {
        let errors = user.validateSync();
    } catch (err){
        console.log('errors', errors);
        next(err);
    }

    user.save(function (err, saved) {
        if(err){
            let error = new Error();
            error.message = 'users';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }

        res.json({success: true, saved: saved});
    });
});

// JWT Authentication

// Authentication
router.post('/authenticate', function (req, res) {
    let email = req.body.email;
    let pass = req.body.key;

    if (pass){
        pass = sha(pass);
    }



    User.findOne({email: email}).exec(function(err, user){

        // Controlling server error
        if(err){
            let error = new Error();
            error.message = 'server';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }

        // Controlling email field
        if(!email){
            let error = new Error();
            error.message = 'email';
            error.language = req.lang;
            error.status = 401;
            errors(error, res);
            return;
        }

        // Controlling pass field
        if(!pass){
            let error = new Error();
            error.message = 'key';
            error.language = req.lang;
            error.status = 401;
            errors(error, res);
            return;
        }

        if(user.key !== pass){
            let error = new Error();
            error.message = 'pwd';
            error.language = req.lang;
            error.status = 401;
            errors(error, res);
            return;
        }

        let token = jwt.sign({id: user._id}, config.jwt.secret, {
            expiresIn: '2 days'
        });

        res.json({success: true, token: token});
    });
});


// Exporting the router
module.exports = router;
