import axios from "axios";

class ProductDataService {
  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products?page=${page}`
    );
  }

  //add get id path
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/id/${id}`
    );
  }

  find(query, by = "name", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products?${by}=${query}&page=${page}`
    );
  }

  //   getRatings() {
  //     return axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/ratings`
  //     );
  //   }
  createReview(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/review`,
      data
    );
  }

  updateReview(data) {
    return axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/review`,
      data
    );
  }

  deleteReview(data) {
    return axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/review`,
      { data }
    );
  }
}

export default new ProductDataService();
