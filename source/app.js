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

/***
 * connect redis and mongodb
 */
require('./tests/inventory.test');
const productTest = require('./tests/product.test');
productTest.purchaseProduct('product:001',10)
require('./dbs/init.mongodb');

//this is redis
// const initRedis = require('./dbs/init.redis')
// initRedis.initRedis()


//init routes
app.use('/',require('./routes'))
//error handling
//this is middleware with 3 parameter
app.use((req,res,next)=>{
    const error = new Error('not found')
    error.status = 404
    next(error)
})

// error management with 4 parameter
app.use((error,req,res,next)=>{
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status:'error',
        code:statusCode,
        stack:error.stack,
        message:error.message || 'Internal Server Error'
    })
})


module.exports=app