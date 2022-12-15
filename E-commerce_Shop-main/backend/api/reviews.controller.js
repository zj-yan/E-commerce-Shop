//This will handle data requests for reviews.
import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const productId = req.body.product_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(
        productId,
        userInfo,
        review,
        date
      );

      var { error } = reviewResponse;
      console.log(error);
      if (error) {
        res.status(500).json({ error: "Unable to post review." });
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date
      );

      var { error } = reviewResponse;
      console.log(error);
      if (error) {
        res.status(400).json({ error });
      } else if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review");
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      var { error } = reviewResponse;

      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
