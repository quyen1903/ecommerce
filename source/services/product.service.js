'use strict'

const { product, clothing, electronic } = require('../models/product.model');
const {BadRequestError,ForbiddenError} = require('../core/error.response')

//define factory class to create product
class ProductFactory {
    /*
        type:'Clothing',
        payload
    */
    static async createProduct(type,payload){
        switch(type){
            case 'Electronics': return new Electronic(payload).createProduct()
            case 'Clothing' : return new Clothing(payload).createProduct()
            default: throw new BadRequestError(`Invalid product type ${type}`)
        }
    }
}

//define base product class
class Product{
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_type,
        product_shop,
        product_attributes,
        product_quantity
    }){
        this.product_name = product_name,
        this.product_thumb = product_thumb,
        this.product_description = product_description,
        this.product_price = product_price,
        this.product_type = product_type,
        this.product_shop = product_shop,
        this.product_attributes = product_attributes,
        this.product_quantity = product_quantity
    }
    // create new product
    async createProduct(){
        return await product.create(this)
    }
}

//define subclass for different product types Clothing

class Clothing extends Product{
    async createProduct(){
        const newClothing = await clothing.create(this.product_attributes)
        if(!newClothing)throw new BadRequestError('create new Clothing Error')

        const newProduct = await super.createProduct()
        if(!newProduct) throw new BadRequestError('create new Product error')
    }    
}

class Electronic extends Product{
    async createProduct(){
        const newElectronic = await electronic.create(this.product_attributes)
        if(!newElectronic)throw new BadRequestError('create new Clothing Error')

        const newProduct = await super.createProduct()
        if(!newProduct) throw new BadRequestError('create new Product error')
    }    
}

module.exports = ProductFactory