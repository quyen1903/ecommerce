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
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
//init database
require('./dbs/init.mongodb');

//init routes
app.use('/',require('./routes'))
//error handling
module.exports=app