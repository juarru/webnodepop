/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Module for manage Mongoose connection´s to Database
 *
 */

'use strict';

// Create connection variables
let mongoose = require('mongoose');
let connection = mongoose.connection;

// Connection events handlers

connection.on('error', function () {
    console.log('Connection error!');
});

// Database connection
mongoose.connect('mongodb://localhost:27017/nodepop');