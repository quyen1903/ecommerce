'use strict'

const { product, clothing, electronic, furniture } = require('../models/product.model');
const {BadRequestError} = require('../core/error.response');

const { findAllDraftsForShop,
        publishProductByShop,
        findAllPublishForShop,
        unPublishProductByShop,
        searchProductByUser,
    } = require('../models/repository/product.repo');

/*
    define factory class to create product
*/
class ProductFactory {

    //store product type and their corresponding class references
    static productRegistry = {}//key or class

    /*
        registe product type along with corresponding class reference in productRegistry
        we can loop through product.config.js as strategy pattern to add more product type
    */
    static registerProductType(type, classRef){
        ProductFactory.productRegistry[type] = classRef
    }

    /*
        create product of special type
        retrieve class reference for specified product type from productRegistry
    */ 
    static async createProduct( type, payload ){
        const productClass = ProductFactory.productRegistry[type]//reference to productRegistry, not override value inside of it.
        if(!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)
        return new productClass(payload).createProduct()//invoke createProduct() of instantiated class
    }

    //PUT
    static async publishProductByShop({product_shop, product_id}){
        return await publishProductByShop({product_shop, product_id})
    }

    static async unPublishProductByShop({product_shop, product_id}){
        return await unPublishProductByShop({product_shop, product_id})
    }
    //END PUT

    /* query */
    static async findAllDraftsForShop({product_shop, limit = 50, skip = 0}){
        const query = {product_shop, isDraft:true}
        return await findAllDraftsForShop({query, limit, skip})
    }

    static async findAllPublishForShop({product_shop, limit = 50, skip = 0}){
        const query = {product_shop, isPubished:true}
        return await findAllPublishForShop({query, limit, skip})
    }

    static async getListSearchProduct( {keySearch} ){
        return searchProductByUser({keySearch})
    }

    static async findAllProducts( {limit = 50, sort='ctime'} ){
        return findAllProducts()
    }

    static async findProduct( {} ){

    }

    static async updateProduct( {} ){

    }
}

/*
    define base product class
    async createProduct meant to be overridden by subclass 
*/
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
    // create new product instance in database
    async createProduct(product_id){
        return await product.create({...this, _id:product_id})
    }
}



class Clothing extends Product{
    async createProduct(){
        const newClothing = await clothing.create(this.product_attributes)
        if(!newClothing)throw new BadRequestError('create new Clothing Error')

        const newProduct = await super.createProduct()
        if(!newProduct) throw new BadRequestError('create new Product error')
    }    
}

/* 
    define for different product
    inherit from Product class and override createProduct() 
*/
class Electronics extends Product{
    async createProduct(){
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if(!newElectronic)throw new BadRequestError('create new Electronic Error')

        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new BadRequestError('create new Product error')
    }    
}

class Furniture extends Product{
    async createProduct(){
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if(!newFurniture)throw new BadRequestError('create new Furniture Error')

        const newProduct = await super.createProduct(newFurniture._id)
        if(!newProduct) throw new BadRequestError('create new Product error')
    }    
}

//regis product type
ProductFactory.registerProductType('Electronics',Electronics)
ProductFactory.registerProductType('Clothing',Clothing)
ProductFactory.registerProductType('Furniture',Furniture)

module.exports = ProductFactory
