//This will handle data requests specific to product item.
//The apiGetProducts, apiGetProductById, and apiGetRatings methods
//referred to in the routes above are implemented in products.controller.js.
import ProductsDAO from '../dao/productsDAO.js';
export default class ProductsController {
  static async apiGetProducts(req, res, next) {
    const productsPerPage = req.query.productsPerPage
      ? parseInt(req.query.productsPerPage)
      : 8;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { productsList, totalNumProducts } = await ProductsDAO.getProducts({
      filters,
      page,
      productsPerPage,
    });

    let response = {
      products: productsList,
      page: page,
      filters: filters,
      entries_per_page: productsPerPage,
      total_results: totalNumProducts,
    };
    res.json(response);
  }

  static async apiGetProductById(req, res, next) {
    try {
      let id = req.params.id || {};
      let product = await ProductsDAO.getProductById(id);
      if (!product) {
        res.status(404).json({ error: 'not found' });
        return;
      }
      res.json(product);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiGetRatings(req, res, next) {
    try {
      let propertyTypes = await ProductsDAO.getRatings();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
