import axios from 'axios';

class OrderDataService {
  getOrderInfos(userId) {
    //console.log(`dataService${userId}`);
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/order/getorder/${userId}`
    );
  }

  makeOrder(userId) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/order/makeOrder/${userId}`);
  }
}

export default new OrderDataService;
