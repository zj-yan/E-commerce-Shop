import React, { useState, useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import './profile.css';
import Logout from './Logout';
import OrderItem from './OrderItem.js';
import OrderDataService from '../../services/order.js';
import ProductDataService from '../../services/product';
import Row from 'react-bootstrap/Row';

const Profile = ({ user, setUser }) => {
  if (user == null) {
    let loginData = JSON.parse(localStorage.getItem('login'));
    user = loginData;
  }
  console.log(user);
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState('');
  const [orderInfos, setOrderInfos] = useState([]);

  const retrieveOrderInfo = useCallback(() => {
    console.log('!!!!Come to retrieveOrderInfo');
    if (user) {
      let myPromise = new Promise(function (myResolve, myReject) {
        let id = user.googleId;
        OrderDataService.getOrderInfos(id)
          .then((response) => {
            const productList = response.data;
            console.log(productList);
            if (productList != null) {
              setOrderInfos(productList);
              myResolve('True');
            } else {
              myReject('Password is wrong');
            }
          })
          .catch((e) => {
            myReject('Order is null in the database');
          });
      });

      myPromise.then(
        function (value) {
          console.log('myPromise then ');
        },
        function (error) {
          setOrderInfos(null);
          console.log('error: ' + error);
        }
      );
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log(user.name);
      setUserId(user.name);
      retrieveOrderInfo();
    }
  }, [user]);

  console.log('orderInfo = ');
  //console.log(orderInfos);
  //console.log(Object.values(orderInfos));
  const value = JSON.stringify(orderInfos);

  return (
    <Container className="Profile-container">
      <h1 class="content">Dear {userId}!</h1>
      <h1 class="content">Welcome Back!</h1>
      <Logout setUser={setUser} />
      {
        <div>
          {orderInfos != null ? (
            <OrderItem orderInfos={orderInfos} />
          ) : (
            "You don't have orders"
          )}
        </div>
      }
      {/* <section id="home">
        <h6 class="section-title">Contact us</h6>
        <div class="contact-info">
          <div class="item">
            <i class="fas fa-envelope"></i>
            TheSignal@northeastern.edu
          </div>

          <div class="item">
            <i class="fas fa-map-marker-alt"></i>
            San Jose, California
          </div>
        </div>
      </section> */}
    </Container>
  );
};

export default Profile;
