import { json } from 'express';
import orderDAO from '../dao/orderDAO.js';
import cartDAO from '../dao/cartDAO.js';

export default class orderController {
    static async apiGetOrderInfo(req, res, next) {
        //console.log('come to get apiGetCartInfo');
        try {
            let user_id = req.params.userId;
            //console.log("userid = " + user_id); 
            let orderInfo = await orderDAO.getOrderInfos(user_id);
            if (!orderInfo) {
                console.log('orderInfo is empty');
                //??? error??
                res.status(404).json({ error: 'not found orderInfo---' });
                return;
            }

            res.json(orderInfo);
        } catch (e) {
            console.log('orderInfo');
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
            return;
        }
    }

    //apiMakeOrder
    static async apiMakeOrder(req, res, next) {
        //console.log('Come into apiMakeOrder');
        let userId = req.params.userId;
        let productInfo = null;
        try {
            //let user_id = req.params.userId; 
            productInfo = await cartDAO.getCartInfos(userId);
        }
        catch (e) {
            console.error(e);
        }
        //console.log(productInfo)
        if (productInfo == null) {
            res.json({ error: "No such user" });
        }
        else {
            var allProducts = productInfo.products;
            //console.log(allProducts);
            if (allProducts == null) {
                res.json({ error: "The cart is empty, nothing to order" });
            }
            else {
                try {
                    //console.log('req.body.user_id = ' + req.body.user_id);
                    const orderResponse = await orderDAO.makeOrder(
                        userId,
                        allProducts
                    );
                    res.json({ status: 'success' });
                } catch (e) {
                    console.log('updateOrder');
                    res.status(500).json({ error: e.message });
                }
                
            }
        }
    }


}
