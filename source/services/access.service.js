'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError,ConflictRequestError } = require('../core/error.response');


// services //
const { findByEmail } = require('./shop.service');
const RoleShop = {
    SHOP:'SHOP',
    WRITER:'WRITER',
    EDITOR:'EDITOR',
    ADMIN:'ADMIN'
}

class AccessService{
    /*
        1 - check email in database
        2 - match password
        3 - create access token, refresh token and save
        4 - generate tokens
        5 - get data return login
    */
    static logout = async(keyStore)=>{
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        console.log({delKey})
        return delKey 
    }
    static login = async({email,password,refreshToken =  null})=>{
        //1
        const foundShop = await findByEmail({email})
        if(!foundShop) throw new BadRequestError('Shop not registed');
        //2
        const match = bcrypt.compare(password, foundShop.password)
        if(!match) throw new AuthFailureError('Authentication error')
        //3
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        //4
        const { _id:userId } = foundShop 
        const tokens = await createTokenPair({userId,email},publicKey,privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken:tokens.refreshToken,
            privateKey,
            publicKey,
            userId:foundShop._id,email
        })  
        return{
            shop:getInfoData({field:['_id','name'],object:foundShop}),
            tokens
        }
    }

    static signUp = async ({name, email, password})=>{
        //check email existed?
        //lean() return pure object js, so everything is faster
        const holderShop = await shopModel.findOne({email}).lean()
        if(holderShop){
            throw new BadRequestError('Error: shop already registed')
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, password:passwordHash, roles:[RoleShop.SHOP]
        });

        //if newShop successfully created
        if(newShop){
            //create private key and public key
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            console.log({privateKey,publicKey})//save collection keystore

            const keyStore = await KeyTokenService.createKeyToken({
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
    }
}

module.exports = AccessService