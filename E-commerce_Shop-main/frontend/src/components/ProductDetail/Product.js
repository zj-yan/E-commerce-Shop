import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';
import ListGroup from 'react-bootstrap/ListGroup';
import ProductDataService from '../../services/product.js';
import orderDataService from '../../services/cart.js';
import './Product.css';
import { Col } from 'react-bootstrap';
import moment from 'moment';

const Product = ({ user }) => {
  let params = useParams();
  console.log(params);
  const [products, setProducts] = useState({
    id: null,
    name: '',
    rating: '',
    reviews: [],
  });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProduct = (id) => {
      ProductDataService.get(id)
        .then((response) => {
          //console.log(response.data);
          setProducts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getProduct(params.id);
    console.log(params);
  }, [params.id]);

  const deleteReview = (reviewId, index) => {
    let data = { review_id: reviewId, user_id: user.googleId };
    ProductDataService.deleteReview(data)
      .then((response) => {
        setProducts((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //add product to cart
  const addCart = (user, params) => {
    if (user) {
      //alert('Add to Cart Succssfully!');
      swal(
        'Succssfully!',
        `You just add ${products.name} to the cart!`,
        'success'
      );
    } else {
      //alert('Please Login in first!');
      swal('Sorry!', 'Please Login in first!', 'error');
    }
    let addCartInfo = {
      user_id: user.googleId,
      product_id: products._id,

      // product_name: products.name,
      // product_image: products.image,
      // product_price: products.price,
      // quantity: 1,
    };
    console.log(addCartInfo);
    orderDataService
      .updateCart(addCartInfo)
      .then((response) => {
        setCart(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    //console.log(params.id);
  };

  return (
    <div className="ProductContainer">
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={products.image}
            alt={products.name}></img>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <div className="ProductDes">
              <ListGroup.Item className="ProductDetailName">
                Name: {products.name}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${products.price}</ListGroup.Item>
              <ListGroup.Item>
                <p className="ProductDetailDesTitle">Description:</p>
                <p className="ProductDetailDes">{products.description}</p>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col className="ProductDetailCount">
                    Count in Stock: {products.countInStock}
                  </Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <div>
                  <Button
                    className="ProductDetailButton"
                    onClick={() => {
                      addCart(user, params.id);
                    }}>
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <section id="ReviewSection">
          <div className="inner-width">
            <h2 className="review-section-title">Reviews</h2>
            {user && (
              <Link
                to={'/products/' + params.id + '/review'}
                className="addReviewButton">
                Add Review
              </Link>
            )}
            {products.reviews.map((review, index) => {
              return (
                <div className="d-flex">
                  <div class="block">
                    <div className="reviewText">
                      <h4 className="nameDate">
                        {review.name + ' reviewed on '}{' '}
                        {moment(review.date).format('Do MMMM YYYY')}
                      </h4>
                      <h3 className="review">{review.review}</h3>
                      {user && user.googleId === review.user_id && (
                        <Row>
                          <Col>
                            <Link
                              to={{
                                pathname: '/products/' + params.id + '/review',
                              }}
                              state={{
                                currentReview: review,
                              }}
                              className="functionBut">
                              Edit
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              variant="link"
                              onClick={() => {
                                deleteReview(review._id, index);
                              }}
                              className="functionBut">
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Row>
    </div>
  );
};

export default Product;
