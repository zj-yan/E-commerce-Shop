import axios from 'axios';

class CartDataService {
  getCartInfos(userId) {
    //console.log(`dataService${userId}`);
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart/${userId}`
    );
  }

  updateCart(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart/updateCart`,
      data
    );
  }

  decreaseCart(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart/decrease`,
      data
    );
  }

  makeOrder(userId) {
    //console.log("Come the CartDataService, cart.js " + userId);
    //console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/order/makeOrder/${userId}`); 
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/order/makeOrder/${userId}`);
  }
}

export default new CartDataService();
