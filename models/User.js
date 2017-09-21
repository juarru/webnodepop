/**
 * Created by juan_arillo on 30/4/16.
 *
 * Mongoose Users Model
 */

'use strict';

// Loading mongoose
let mongoose = require('mongoose');

// Designing User Schema
let userSchema = mongoose.Schema({
    name: {type: String, index: true, required: true},
    email: {type: String, index: true, required: true},
    key: {type: String, required: true}
});

// Assingning schema to model
mongoose.model('User', userSchema);
