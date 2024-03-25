'use strict'
class CheckoutService{
    static async checkoutReview({ cartId, userId, shop_order_ids}){
        //check cart id existed?
        const foundCart = await findCartById(cartId)
    }
}

module.exports = CheckoutService