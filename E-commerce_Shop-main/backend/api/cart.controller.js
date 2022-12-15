import { json } from 'express';
import cartDAO from '../dao/cartDAO.js';

export default class cartController {
  static async apiGetCartInfo(req, res, next) {
    //console.log('come to get apiGetCartInfo'); 
    try {
      let user_id = req.params.userId;
      //console.log("userid = " + user_id); 
      let cardInfo = await cartDAO.getCartInfos(user_id);

      if (!cardInfo) {
        console.log('cardInfo is empty');
        res.status(404).json({ error: 'not found---' });
        return;
      }
      res.json(cardInfo);
    } catch (e) {
      console.log('updateOrder');
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
      return;
    }
  }



  static async apiUpdateCartInfo(req, res, next) {
    //console.log('Come into apiUpdateOrder'); 
    try {
      //console.log('req.body.user_id = ' + req.body.user_id);
      const orderResponse = await cartDAO.updateCart(
        req.body.user_id,
        req.body.product_id
      );
      var { error } = orderResponse;
      if (error) {
        res.status(500).json({ error });
        console.log('updateOrder');
      }
      console.log('updateOrder');
      res.json({ status: 'success' });
      console.log('out update order');
    } catch (e) {
      console.log('updateOrder');
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDecreaseCartInfo(req, res, next) {
    console.log('Come into apiDecreaseCartInfo'); 
    try {
      //console.log('req.body.user_id = ' + req.body.user_id);
      
      const orderResponse = await cartDAO.decreaseCart(
        req.body.user_id,
        req.body.product_id
      );
      var { error } = orderResponse;
      if (error) {
        res.status(500).json({ error });
        console.log('updateOrder');
      }
      console.log('updateOrder');
      res.json({ status: 'success' });
      console.log('out update order');
    } catch (e) {
      console.log('updateOrder');
      res.status(500).json({ error: e.message });
    }
  }


}
