import express from 'express';
import cartController from './cart.controller.js';

const router = express.Router();

router.route('/updateCart').post(cartController.apiUpdateCartInfo);

router.route('/decrease').post(cartController.apiDecreaseCartInfo);

router.route('/:userId').get(cartController.apiGetCartInfo);

export default router;
