require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { default:helmet } = require('helmet');
const compression = require('compression');

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
//init database
require('./dbs/init.mongodb');

//init routes
app.get('/',(req,res,next)=>{
    return res.status(200).json({
        message:'welcome'
    })
})
//error handling
module.exports=app