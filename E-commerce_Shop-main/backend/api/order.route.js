//maekOrder
import express from 'express';
import orderController from './order.controller.js';

const router = express.Router();

router.route('/getorder/:userId').get(orderController.apiGetOrderInfo);

router.route('/makeOrder/:userId').put(orderController.apiMakeOrder);

export default router;