import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import './OrderItem.css';

const OrderItem = ({ orderInfos }) => {
  const [OrderPD, setOrderPD] = useState([]);
  console.log(orderInfos);
  //let productInfo = orderInfos.products;
  //console.log(productInfo);
  let collection = [];
  const item = orderInfos.map((item) => item.products);
  console.log(item);
  for (const each of item) {
    console.log(each);
    let list = [];
    for (const [key, value] of Object.entries(each)) {
      var productInfo = {
        id: key,
        quantity: value,
      };
      list.push(productInfo);
    }
    collection.push(list);
    console.log(collection);
  }

  const item1 = collection.forEach(function (item, index) {
    console.log(item, index);
    const list2 = item.map((item) => item.id);
    console.log(list2[0]);
  });
  console.log(item1);

  let each = 0;
  return (
    <div className="OrderItem">
      <p className="shoppingCartName">Order History</p>
      <Row>
        {orderInfos.map((element) => (
          <Card className="orderCard">
            <Row>
              <Col>
                <Card.Body>
                  <div>
                    <span className="tag">Order Number: </span>
                    {element._id}
                  </div>
                  <div>
                    <span className="tag">Order Time : </span>
                    {moment(element.orderTime).format('Do MMMM YYYY')}
                  </div>
                  <div>
                    {collection.forEach(function (item, index) {
                      item.map((each) => (each = each.id));
                    })}
                    <div>{each.id}</div>
                  </div>
                  {/* <div>{JSON.stringify(element.products)}</div> */}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default OrderItem;
