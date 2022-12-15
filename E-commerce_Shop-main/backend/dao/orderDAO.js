import { json } from 'express';
let orderInfos;

export default class orderDAO {
    static async injectDB(conn) {
        if (orderInfos) {
            return;
        }
        try {
            orderInfos = await conn
                .db(process.env.PRODUCTREVIEWS_NS)
                .collection('orders');
            console.log('orders after injectDB');
        } catch (e) {
            console.error(`Unable to connect in orderDAO: ${e}`);
        }
    }

    static async getOrderInfos(userId) {
        //console.log('orderDAO getOrderInfos = ' + userId);
        let cursor;
        try {
            cursor = await orderInfos.find({
                user_id: userId,
            });
            const products = await cursor.toArray();
            //console.log('products = ' + json.toString(products.value));
            return products;
        } catch (e) {
            //console.log('DAOupdateOrder');
            console.error(`Something went wrong in getOrder: ${e}`);
            throw e;
        }
    }

    static async makeOrder(userId, productInfo) {
        //console.log('makeOrder userId= ' + userId);
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const ordertime = today.toUTCString();
        //console.log("ordertime = " + ordertime);
        let sum = 0;
        for (const value of Object.values(productInfo)) {
            sum += value;
        }
        //console.log("sumValues = " + sum);
        try {
            const markOrderResponse = await orderInfos.insertOne({
                user_id: userId,
                products: productInfo,
                orderTime: ordertime,
                totalItemNumber: sum
            });
            return markOrderResponse;
        } catch (e) {
            console.error(`Unable to update cart: ${e}`);
            return { error: e };
        }
    }
}


