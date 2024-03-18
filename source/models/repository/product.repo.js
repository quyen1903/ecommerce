'use strict'

const { result } = require('lodash');
const { product,electronic,furniture,clothing } = require('../product.model');
const { Types } = require('mongoose')

const findAllDraftsForShop = async( {query, limit, skip} )=>{
    return await queryProduct({query, limit, skip})
}

const findAllPublishForShop = async ({query, limit, skip})=>{
    return await queryProduct({query, limit, skip})
}
/*
    this is full-text search
    we need index 

*/
const searchProductByUser = async ({keySearch})=>{
    const regexSearch = new RegExp(keySearch)
    const results = await product.find(
        {
            isPubished:true,
            $text:{
                $search:regexSearch
            }
        },
        {
            score:{
                $meta:'textScore'
            }
    }).sort(
        {
            score:
            {$meta:'textScore'}
        }
    ).lean();
    return results
}
/**
 * 
 * @param {*} product_shop 
 * @param {*} product_id 
 * @returns 
 */
const publishProductByShop = async ({product_shop, product_id})=>{
    const foundShop =await product.findOne({
        product_shop: product_shop,
        _id: product_id
    });

    if(!foundShop) return null

    foundShop.isDraft = false
    foundShop.isPubished = true
    const { modifiedCount} = await foundShop.updateOne(foundShop)
    
    return modifiedCount
}

const unPublishProductByShop = async ({product_shop, product_id})=>{
    const foundShop =await product.findOne({
        product_shop: product_shop,
        _id: product_id
    });

    if(!foundShop) return null

    foundShop.isDraft = true
    foundShop.isPubished = false
    const { modifiedCount} = await foundShop.updateOne(foundShop)
    
    return modifiedCount
}

const findAllProducts = async()

const queryProduct = async ({query, limit, skip})=>{
    return await product.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({updateAt: -1})
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}


module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unPublishProductByShop,
    searchProductByUser,
}