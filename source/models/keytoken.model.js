'use strict'
const {model,Schema,Types} = require('mongoose'); // Erase if already required


const DOCUMENT_NAME='Key'
const COLLECTION_NAME='Keys'
// Declare the Schema of the Mongo model


const keyTokenSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'Shop'
    },
    privateKey:{
        type:String,
        required:true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshTokensUsed:{
        type:Array,
        default:[]
    },
    refreshToken:{
        type:String,
        require:true
    }
},{
    collection:COLLECTION_NAME,
    timestamps:true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);