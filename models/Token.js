/** 
 *
 * Created by juan_arillo on 3/5/16. 
 * 
 * Description: Mongoose Token´s model 
 */
'use strict';

// Loading mongoose 

let mongoose = require('mongoose');

  // Designing User Schema 

let pushTokenSchema = mongoose.Schema({ 
    platform: {type: String, enum: ['ios', 'android'], required: true}, 
    token: {type: String, required: true},
    user: String }); 

 // Assingning schema to model 

mongoose.model('Token', pushTokenSchema);
