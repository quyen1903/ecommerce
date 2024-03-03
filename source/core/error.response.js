'use strict'

const StatusCode = {
    FORBIDEN:403,
    CONFLICT:403
}

const ReasonStatusCode = {
    FORBIDEN:'Bad request error',
    CONFLICT:'Conflict error'
}

const {
    StatusCodes,
    ReasonPhrases
}= require('../utils/httpStatusCode')
const reasonPhrases = require('../utils/reasonPhrases')

class ErrorResponse extends Error{
    constructor(message,status){
        super(message),
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse{
    constructor(message= ReasonStatusCode.CONFLICT,statusCode=StatusCode.FORBIDEN){
        super(message,statusCode)
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message= ReasonStatusCode.CONFLICT,statusCode=StatusCode.FORBIDEN){
        super(message,statusCode)
    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message= ReasonPhrases.UNAUTHORIZED,statusCode=StatusCodes.UNAUTHORIZED){
        super(message,statusCode)
    }
}

class NotFoundError extends ErrorResponse{
    constructor(message= ReasonPhrases.NOT_FOUND,statusCode=StatusCodes.NOT_FOUND){
        super(message,statusCode)
    }
}


module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFoundError,
    AuthFailureError
}