//This will handle routing of incoming http requests, based on their URLs.
import express from 'express';
import ProductsController from './products.controller.js';
import ReviewsController from './reviews.controller.js';



const router = express.Router(); //get access to express router

router.route('/').get(ProductsController.apiGetProducts);

router.route('/id/:id').get(ProductsController.apiGetProductById);

//the route for review
router
  .route('/review')
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
