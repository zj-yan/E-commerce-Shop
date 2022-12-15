import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
//import { memo } from 'react';

import './Cart.css';

const Basket = ({ basket, onAdd, onRemove }) => {
  // const [cards, setCards] = useState(cart);

  // useEffect(() => {
  //   if (cart.length > 0) setCards(cart);
  // }, [cart]);

  console.log(basket);

  const price = basket.reduce(
    (total, current) => (total = total + current.quantity * current.price),
    0
  );
  const item = basket.reduce(
    (total, current) => (total = total + current.quantity),
    0
  );

  return (
    <div>
      <p className="shoppingCartName">SHOPPING CART</p>
      <Row>
        {basket.map((element) => (
          <Card className="productCard">
            <Row>
              <Card.Img className="productImage" src={element.image} />
              <Col>
                <Card.Body className="productName">{element.name}</Card.Body>
                <div>${element.price}</div>
                <div className="quantity">
                  <button
                    className="quantityBox"
                    onClick={() => onRemove(element)}>
                    &mdash;
                  </button>
                  <button
                    className="quantityBox"
                    onClick={() => onAdd(element)}>
                    &#xff0b;
                  </button>
                  <span className="qty"> Qty: {element.quantity}</span>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default Basket;
