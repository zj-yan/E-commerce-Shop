import React, { useState, useCallback, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Basket from './Basket.js';
import { useParams } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import CartDataService from '../../services/cart.js';
import ProductDataService from '../../services/product';
import './Cart.css';

const payPalId = process.env.REACT_APP_PAYPAL_ID;

const Cart = ({ user }) => {
  //const [cart, setCart] = useState([]);
  const [basket, setBasket] = useState([]);
  const [product, setProduct] = useState();
  let loginData = JSON.parse(localStorage.getItem('login'));
  user = loginData;

  const setCartProducts = useCallback(() => {
    //console.log(user);
   
    CartDataService.getCartInfos(user.googleId)
      .then((response) => {
        const productList = response.data.products;
       
        let collection = [];
        for (const key of Object.keys(productList)) {
          
          ProductDataService.get(key).then((response) => {
           
            var curr = {
              id: response.data._id,
              name: response.data.name,
              image: response.data.image,
              price: response.data.price,
              quantity: productList[key],
            };
            collection.push(curr);
            //collection.forEach(e => setBasket(e));
            let arr = JSON.parse(JSON.stringify(collection));
            console.log(arr);
            setBasket(arr);
          });
        }         
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setCartProducts();
    }
  }, [setCartProducts]);

  const price = parseInt(
    basket.reduce(
      (total, current) => (total = total + current.quantity * current.price),
      0
    )
  );

  const item = parseInt(
    basket.reduce((total, current) => (total = total + current.quantity), 0)
  );

  const onRemove = (item) => {
    const has = basket.find((x) => x.id === item.id);
    let data = { user_id: user.googleId, product_id: item.id };
    if (has.quantity === 1) {
      setBasket(basket.filter((x) => x.id !== item.id));
    } else {
      setBasket(
        basket.map((x) =>
          x.id === item.id ? { ...has, quantity: has.quantity - 1 } : x
        )
      );
    }
    CartDataService.decreaseCart(data);
  };

  const onAdd = (item) => {
    const has = basket.find((x) => x.id === item.id);
    let data = { user_id: user.googleId, product_id: item.id };
    CartDataService.updateCart(data);
    setBasket(
      basket.map((x) =>
        x.id === item.id ? { ...has, quantity: has.quantity + 1 } : x
      )
    );
  };

  const submitorder = () => {
    let id = user.googleId;
    CartDataService.makeOrder(id);
    console.log(id);
    window.location = '/profile';
  };

  return (
    <div className="cart">
      <div>
        <Row>
          <Col>
            <Basket basket={basket} onAdd={onAdd} onRemove={onRemove} />
          </Col>
          <Col className="cartCal">
            <p className="shoppingCartName">Order Summary</p>
            <Card className="costCard">
              <Card.Body>
                <p>Item: {item}</p>
                <hr></hr>
                Order total: ${price}
              </Card.Body>
            </Card>
            <div>
              <button className="submit" onClick={submitorder}>
                Submit Order
              </button>
            </div>
            <div className="checkout">
              <PayPalScriptProvider options={{ 'client-id': payPalId }}>
                <PayPalButtons style={{ layout: 'horizontal' }} />
              </PayPalScriptProvider>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
