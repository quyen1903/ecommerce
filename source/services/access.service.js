'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeytokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const RoleShop = {
    SHOP:'SHOP',
    WRITER:'WRITER',
    EDITOR:'EDITOR',
    ADMIN:'ADMIN'
}

class AccessService{

    static signUp = async ({name, email, password})=>{
        try {
            //check email existed?
            //lean() return pure object js, so everything is faster
            const holderShop = await shopModel.findOne({email}).lean()
            if(holderShop){
                return{
                    code:'xxx',
                    message:'Shop already registed!'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password:passwordHash, roles:[RoleShop.SHOP]
            })
            if(newShop){
                //create public key, private key
                const {privateKey,publicKey}= crypto.generateKeyPairSync('rsa',{
                    modulusLength:4096,
                    publicKeyEncoding:{
                        type:'pkcs1',
                        format:'pem'
                    },
                    privateKeyEncoding:{
                        type:'pkcs1',
                        format:'pem'
                    },
                })
                console.log({privateKey,publicKey})//save collection keystore

                const publicKeyString = await KeytokenService.createKeyToken({
                    userId:newShop._id,
                    publicKey
                })
                if(!publicKeyString){
                    return{
                        code:'xxx',
                        message:'publicKeyString error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                //create token pair
                const tokens = await createTokenPair({userId:newShop._id,email},publicKeyString,privateKey)
                
                console.log(`Create Token Success::`,tokens);
                return{
                    code:201,
                    metadata:{
                        shop:getInfoData({field:['_id','name'],object:newShop}),
                        tokens
                    },
                    
                }
            }
            return {
                code:200,
                metadata:null
            }
        } catch (error) {
            return{
                code:'xxx',
                message:error.message,
                status:'error'
            }
        }
    }
}

module.exports = AccessService