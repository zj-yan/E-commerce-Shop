// This will query the MongoDB database directly for products data.
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let products;

export default class ProductsDAO {
  static async injectDB(conn) {
    if (products) {
      return;
    }
    try {
      products = await conn
        .db(process.env.PRODUCTREVIEWS_NS)
        .collection('sales');
    } catch (e) {
      console.error(`Unable to connect in ProductsDAO: ${e}`);
    }
  }

  static async getProducts({
    filters = null,
    page = 0,
    productsPerPage = 8,
  } = {}) {
    //empty object is default parameter in case arg is undefined
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters[`name`] } };
      } else if ('rated' in filters) {
        query = { rated: { $eq: filters[`rating`] } };
      }
    }

    let cursor;
    try {
      cursor = await products.find(query).skip(productsPerPage * page);
      const productsList = await cursor.toArray();
      const totalNumProducts = await products.countDocuments(query);
      return { productsList, totalNumProducts };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { productsList: [], totalNumProducts: 0 };
    }
  }

  static async getProductById(id) {
    try {
      return await products
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'product_id',
              as: 'reviews',
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`Something went wrong in getProductById: ${e}`);
      throw e;
    }
  }
}
