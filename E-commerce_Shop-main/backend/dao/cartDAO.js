import { json } from 'express';
let cardinfos;

export default class cartDAO {
  static async injectDB(conn) {
    if (cardinfos) {
      return;
    }
    try {
      //console.log('cartDAO injectDB');
      cardinfos = await conn
        .db(process.env.PRODUCTREVIEWS_NS)
        .collection('cartInfos');
      //console.log('cartInfos after injectDB');
    } catch (e) {
      console.error(`Unable to connect in cartDAO: ${e}`);
    }
  }

  static async getCartInfos(userId) {
    //console.log('orderDAO getOrder = ' + userId);
    let cursor;
    try {
      cursor = await cardinfos.find({
        user_id: userId,
      });
      const products = await cursor.toArray();
      //console.log('products = ' + json.toString(products));
      return products[0];
    } catch (e) {
      //console.log('DAOupdateOrder');
      console.error(`Something went wrong in getOrder: ${e}`);
      throw e;
    }
  }


  static async updateCart(userId, productId) {
    //console.log('Come to updateOrder !!');
    let productInfo = null;
    try {
      productInfo = await cartDAO.getCartInfos(userId);
    }
    catch (e) {
      console.error(e);
    }

    //console.log("userId = " + userId);
    //console.log("productId = " + productId);
    // const info = {
    //   productId: 1

    // }
    //console.log(info);

    var productIdNumbers = {};
    productIdNumbers[productId] = 1;
    //console.log(productIdNumbers);

    if (productInfo == null) {
      console.log("productInfo is null");

      const insertInfo = {
        user_id: userId,
        products: productIdNumbers
      }

      try {
        const updateResponse = await cardinfos.insertOne(insertInfo);
        //console.log('Over DAOupdateOrder');
        return updateResponse;
      } catch (e) {
        //console.log('DAOupdateOrder');
        console.error(`Unable to update cart: ${e}`);
        return { error: e };
      }
    }
    else {
      //console.log(productInfo);
      var allProducts = productInfo.products;
      if (allProducts[productId] == null){
        console.log("Don't Have productId ");
        allProducts[productId] = 1;
      }
      else{
        console.log("Have productId ");
        console.log(allProducts[productId]);
        allProducts[productId] = allProducts[productId] + 1;
      }


      try {
        const updateResponse = await cardinfos.updateOne(
          { _id: productInfo._id },
          { $set: { "user_id": userId, "products": allProducts } },
          { upsert: true }
        );
        //console.log('Over DAOupdateOrder');
        return updateResponse;
      } catch (e) {
        //console.log('DAOupdateOrder');
        console.error(`Unable to update cart: ${e}`);
        return { error: e };
      }
    }
  }


  //decreaseCart
  static async decreaseCart(userId, productId) {
    console.log('Come to Dao decreaseCart !!');
    let productInfo = null;
    try {
      productInfo = await cartDAO.getCartInfos(userId);
    }
    catch (e) {
      console.error(e);
    }

    // var productIdNumbers = {};
    // productIdNumbers[productId] = 1;

    if (productInfo == null) {
      return { status: 'user not exist' };
    }
    else {
      //console.log(productInfo);
      var allProducts = productInfo.products;
      if (allProducts[productId] != null) {
        if (allProducts[productId] > 1) {
          allProducts[productId] = allProducts[productId] - 1;
        }
        else {
          delete allProducts[productId];
        }

        try {
          const updateResponse = await cardinfos.updateOne(
            { _id: productInfo._id },
            { $set: { "user_id": userId, "products": allProducts } },
            { upsert: true }
          );
          //console.log('Over DAOupdateOrder');
          return updateResponse;
        } catch (e) {
          //console.log('DAOupdateOrder');
          console.error(`Unable to update cart: ${e}`);
          return { error: e };
        }
      }
      else{
        return { status: 'product not in the cart' }; 
      }
    }
  }
}
