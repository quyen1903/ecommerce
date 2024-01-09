'use strict'
const {Schema,model} = require('mongoose'); // Erase if already required


const DOCUMENT_NAME='Key'
const COLLECTION_NAME='Keys'
// Declare the Schema of the Mongo model


const keyTokenSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'Shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:Array,
        default:[]
    }
},{
    collection:COLLECTION_NAME,
    timestamps:true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);