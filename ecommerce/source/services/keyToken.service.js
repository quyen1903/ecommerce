'use strict'

const keyTokenModel = require("../models/keytoken.model");
const { Schema } = require('mongoose')
class KeyTokenService{

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken})=>{
        try {
            const filter = {user:userId},
            replacement = {
                publicKey,privateKey,refreshTokensUsed:[],refreshToken
            },
            options = {upsert:true,new:true}

            const tokens = await keyTokenModel.findOneAndUpdate(filter,replacement,options);
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
    
    static findByUserId = async(userId)=>{
        return await keyTokenModel.findOne({user:userId})
    }

    static removeKeyById = async(id)=>{
        return await keyTokenModel.deleteMany({id}).lean()
    }
    
    static findByRefreshTokenUsed = async(refreshToken)=>{
        return await keyTokenModel.findOne({refreshTokensUsed:refreshToken})
    }

    static findByRefreshToken = async(refreshToken)=>{
        return await keyTokenModel.findOne({refreshToken})
    }

    static deleteKeyById = async(userId)=>{
        return await keyTokenModel.deleteMany({user:userId})
    }

}

module.exports=KeyTokenService  