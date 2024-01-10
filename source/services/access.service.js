'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
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

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log({privateKey,publicKey})//save collection keystore

                const keyStore = await KeytokenService.createKeyToken({
                    userId:newShop._id,
                    publicKey,
                    privateKey
                })
                if(!keyStore){
                    return{
                        code:'xxx',
                        message:'publicKeyString error'
                    }
                }
                //create token pair
                const tokens = await createTokenPair({userId:newShop._id,email},publicKey,privateKey)
                
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
            console.log(error)
            return{
                code:'xxx',
                message:error.message,
                status:'error'
            }
        }
    }
}

module.exports = AccessService